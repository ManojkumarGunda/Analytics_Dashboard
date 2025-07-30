const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit')
const ExcelJS = require('exceljs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

// POST /api/export
router.post('/', async (req, res) => {
  try {
    const { format, data } = req.body

    if (!format || !data) {
      return res.status(400).json({ error: 'Format and data are required' })
    }

    let fileName = `export_${Date.now()}`
    let contentType = 'application/octet-stream'

    switch (format.toLowerCase()) {
      case 'pdf':
        return generatePDF(res, data, fileName)
      case 'csv':
        return generateCSV(res, data, fileName)
      case 'excel':
        return generateExcel(res, data, fileName)
      default:
        return res.status(400).json({ error: 'Unsupported format' })
    }
  } catch (error) {
    console.error('Export error:', error)
    res.status(500).json({ error: 'Failed to generate export' })
  }
})

// Generate PDF export
const generatePDF = (res, data, fileName) => {
  const doc = new PDFDocument()
  
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}.pdf"`)
  
  doc.pipe(res)
  
  // Add title
  doc.fontSize(24).text('ADmyBRAND Insights Report', { align: 'center' })
  doc.moveDown()
  
  // Add date
  doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' })
  doc.moveDown(2)
  
  // Add metrics
  if (data.metrics) {
    doc.fontSize(16).text('Key Metrics', { underline: true })
    doc.moveDown()
    
    Object.entries(data.metrics).forEach(([key, value]) => {
      doc.fontSize(12).text(`${key}: ${value}`)
    })
    doc.moveDown(2)
  }
  
  // Add chart data
  if (data.revenueData) {
    doc.fontSize(16).text('Revenue Data', { underline: true })
    doc.moveDown()
    
    data.revenueData.forEach(item => {
      doc.fontSize(10).text(`${item.date}: $${item.revenue.toLocaleString()}`)
    })
    doc.moveDown(2)
  }
  
  // Add transaction data
  if (data.recentTransactions) {
    doc.fontSize(16).text('Recent Transactions', { underline: true })
    doc.moveDown()
    
    data.recentTransactions.slice(0, 10).forEach(transaction => {
      doc.fontSize(10).text(`${transaction.id} - ${transaction.customer} - ${transaction.amount} - ${transaction.status}`)
    })
  }
  
  doc.end()
}

// Generate CSV export
const generateCSV = async (res, data, fileName) => {
  const csvWriter = createCsvWriter({
    path: `./temp/${fileName}.csv`,
    header: [
      { id: 'id', title: 'ID' },
      { id: 'date', title: 'Date' },
      { id: 'value', title: 'Value' },
      { id: 'status', title: 'Status' }
    ]
  })

  // Transform data for CSV
  const records = []
  
  if (data.revenueData) {
    data.revenueData.forEach(item => {
      records.push({
        id: 'REV',
        date: item.date,
        value: item.revenue,
        status: 'active'
      })
    })
  }
  
  if (data.recentTransactions) {
    data.recentTransactions.forEach(transaction => {
      records.push({
        id: transaction.id,
        date: new Date(transaction.date).toLocaleDateString(),
        value: transaction.amount,
        status: transaction.status
      })
    })
  }

  await csvWriter.writeRecords(records)
  
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}.csv"`)
  
  // Read and send the file
  const fs = require('fs')
  const fileContent = fs.readFileSync(`./temp/${fileName}.csv`)
  res.send(fileContent)
  
  // Clean up
  fs.unlinkSync(`./temp/${fileName}.csv`)
}

// Generate Excel export
const generateExcel = async (res, data, fileName) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Report Data')
  
  // Add headers
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 15 },
    { header: 'Date', key: 'date', width: 15 },
    { header: 'Value', key: 'value', width: 15 },
    { header: 'Status', key: 'status', width: 15 }
  ]
  
  // Add data
  if (data.revenueData) {
    data.revenueData.forEach(item => {
      worksheet.addRow({
        id: 'REV',
        date: item.date,
        value: item.revenue,
        status: 'active'
      })
    })
  }
  
  if (data.recentTransactions) {
    data.recentTransactions.forEach(transaction => {
      worksheet.addRow({
        id: transaction.id,
        date: new Date(transaction.date).toLocaleDateString(),
        value: transaction.amount,
        status: transaction.status
      })
    })
  }
  
  // Style the header row
  worksheet.getRow(1).font = { bold: true }
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  }
  
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}.xlsx"`)
  
  await workbook.xlsx.write(res)
}

// GET /api/export/formats
router.get('/formats', async (req, res) => {
  try {
    const formats = [
      {
        id: 'pdf',
        name: 'PDF Document',
        description: 'Portable Document Format',
        icon: '📄',
        supported: true
      },
      {
        id: 'csv',
        name: 'CSV File',
        description: 'Comma Separated Values',
        icon: '📊',
        supported: true
      },
      {
        id: 'excel',
        name: 'Excel Spreadsheet',
        description: 'Microsoft Excel Format',
        icon: '📈',
        supported: true
      },
      {
        id: 'json',
        name: 'JSON Data',
        description: 'JavaScript Object Notation',
        icon: '🔧',
        supported: false
      }
    ]

    res.json(formats)
  } catch (error) {
    console.error('Export formats error:', error)
    res.status(500).json({ error: 'Failed to fetch export formats' })
  }
})

module.exports = router 