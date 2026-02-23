import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { CostBreakdown, CalculatorInputs } from './calculator';

/**
 * Export results page to PDF by capturing the visual design
 * This preserves all styling, colors, charts, and layout
 */
export async function exportToPDF(inputs: CalculatorInputs, breakdown: CostBreakdown) {
  try {
    // Find the results container element
    const resultsElement = document.querySelector('[data-pdf-export]') as HTMLElement;
    
    if (!resultsElement) {
      console.error('Results element not found for PDF export');
      return;
    }

    // Create a clone to modify for PDF export
    const clone = resultsElement.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '800px'; // Fixed width for consistent PDF output
    clone.style.background = 'white';
    document.body.appendChild(clone);

    // Remove interactive elements that shouldn't be in PDF
    const buttonsToRemove = clone.querySelectorAll('button:not([data-pdf-keep])');
    buttonsToRemove.forEach(btn => btn.remove());
    
    // Remove social share section
    const socialShare = clone.querySelector('[data-social-share]');
    if (socialShare) socialShare.remove();

    // Capture the element as canvas
    const canvas = await html2canvas(clone, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 800,
    });

    // Remove the clone
    document.body.removeChild(clone);

    // Convert canvas to PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20; // 10mm margins on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // Top margin

    // Add first page
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20; // Account for margins

    // Add additional pages if content is longer than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    // Save the PDF
    const fileName = `pet-cost-estimate-${inputs.petType}-${Date.now()}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to basic PDF if html2canvas fails
    fallbackPDFExport(inputs, breakdown);
  }
}

/**
 * Fallback PDF export using basic jsPDF (original implementation)
 */
function fallbackPDFExport(inputs: CalculatorInputs, breakdown: CostBreakdown) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Pet Cost Calculator Results', pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Pet Info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Pet Type: ${inputs.petType === 'dog' ? 'Dog' : 'Cat'}`, 20, y);
  y += 8;
  doc.text(`Location: ${inputs.location}`, 20, y);
  y += 15;

  // Cost Summary
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Cost Summary', 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`First-Year Total: $${breakdown.firstYear.total.toLocaleString()}`, 20, y);
  y += 8;
  doc.text(`Annual Ongoing: $${breakdown.annual.total.toLocaleString()}`, 20, y);
  y += 8;
  doc.text(`Lifetime (${breakdown.lifetime.years} years): $${breakdown.lifetime.total.toLocaleString()}`, 20, y);
  y += 15;

  // First-Year Breakdown
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('First-Year Cost Breakdown', 20, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const firstYearCosts = [
    { label: 'Purchase/Adoption Fee', amount: breakdown.firstYear.adoptionFee },
    { label: 'Initial Vet Care', amount: breakdown.firstYear.initialVet },
    { label: 'Supplies & Setup', amount: breakdown.firstYear.supplies },
    { label: 'Food (Year 1)', amount: breakdown.firstYear.food },
    { label: 'Pet Insurance', amount: breakdown.firstYear.insurance },
    { label: 'Training', amount: breakdown.firstYear.training },
    { label: 'Grooming', amount: breakdown.firstYear.grooming },
    { label: 'Pet Deposit', amount: breakdown.firstYear.petDeposit },
  ];

  firstYearCosts.forEach((item) => {
    if (item.amount > 0) {
      doc.text(`${item.label}: $${item.amount.toLocaleString()}`, 25, y);
      y += 7;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }
  });

  y += 10;

  // Annual Ongoing Costs
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Annual Ongoing Costs', 20, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const annualCosts = [
    { label: 'Food', amount: breakdown.annual.food },
    { label: 'Routine Vet Care', amount: breakdown.annual.vet },
    { label: 'Pet Insurance', amount: breakdown.annual.insurance },
    { label: 'Grooming', amount: breakdown.annual.grooming },
    { label: 'Supplies', amount: breakdown.annual.supplies },
  ];

  annualCosts.forEach((item) => {
    if (item.amount > 0) {
      doc.text(`${item.label}: $${item.amount.toLocaleString()}/year`, 25, y);
      y += 7;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }
  });

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(128, 128, 128);
  doc.text('Generated by PetCost-Calculator.com', pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
  doc.text(new Date().toLocaleDateString(), pageWidth / 2, doc.internal.pageSize.getHeight() - 5, { align: 'center' });

  // Save the PDF
  doc.save(`pet-cost-estimate-${inputs.petType}-${Date.now()}.pdf`);
}

