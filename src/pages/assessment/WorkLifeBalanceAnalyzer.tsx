const handleDownloadResults = () => {
  const doc = new jsPDF();
  let y = 20;

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Work-Life Balance Results', 105, y, { align: 'center' });
  y += 15;

  // Main Score
  doc.setFontSize(36);
  doc.text(totalScore.toString(), 105, y, { align: 'center' });
  y += 15;

  // Balance Level
  doc.setFontSize(16);
  doc.text(balanceLevel, 105, y, { align: 'center' });
  y += 10;

  // Description
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.text(balanceDescription, 105, y, { align: 'center', maxWidth: 180 });
  y += 20;

  // Category Scores
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Category Scores', 14, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  Object.entries(categoryScores).forEach(([category, score]) => {
    doc.text(`${category}: ${score}/25`, 14, y);
    y += 8;
  });
  y += 10;

  // Strengths
  doc.setFont('helvetica', 'bold');
  doc.text('Key Strengths', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  strengths.forEach((strength: string) => {
    doc.text(`• ${strength}`, 14, y);
    y += 8;
  });
  y += 5;

  // Development Areas
  doc.setFont('helvetica', 'bold');
  doc.text('Growth Opportunities', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  developmentAreas.forEach((area: string) => {
    doc.text(`• ${area}`, 14, y);
    y += 8;
  });

  doc.save('work-life-balance-results.pdf');
}; 