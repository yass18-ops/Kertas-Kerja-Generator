import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import usimLogo from '../assets/usim-logo.png';
import arialFont from '../assets/arial.ttf';
import arialBoldFont from '../assets/arialbd.ttf';

// Register Arial font in React-PDF using the local TTF files for full offline reliability
Font.register({
  family: 'Arial',
  fonts: [
    {
      src: arialFont,
      fontWeight: 'normal',
    },
    {
      src: arialBoldFont,
      fontWeight: 'bold',
    }
  ]
});

// Disable auto-hyphenation globally in react-pdf
Font.registerHyphenationCallback(word => [word]);

const sanitizeName = (name) => {
  if (!name) return '';
  // Clean names in mixed case and remove b./bt./bin/binti
  return name.replace(/\b(bin|binti|b\.|bt\.)\b/gi, '').replace(/\s+/g, ' ').trim();
};

const sanitizeCoverMeta = (text) => {
  if (!text) return '';
  // Remove "USIM", "Sesi Akademik", and acronyms like (MPP), (SKM), (PRU)
  return text
    .replace(/\bUSIM\b/gi, '')
    .replace(/\bSesi\s+Akademik\b/gi, '')
    .replace(/\s*\([a-zA-Z0-9]+\)\s*/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const formatDateRange = (startDateStr, endDateStr) => {
  if (!startDateStr) return '';

  const months = [
    'Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun',
    'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'
  ];

  const parseDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return {
          day: parseInt(parts[2], 10),
          month: parseInt(parts[1], 10) - 1,
          year: parseInt(parts[0], 10)
        };
      }
      return null;
    }
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  };

  const start = parseDate(startDateStr);
  if (!start) return startDateStr.toUpperCase();

  if (!endDateStr) {
    return `${start.day} ${months[start.month]} ${start.year}`;
  }

  const end = parseDate(endDateStr);
  if (!end) return `${start.day} ${months[start.month]} ${start.year}`;

  if (start.year === end.year) {
    if (start.month === end.month) {
      if (start.day === end.day) {
        return `${start.day} ${months[start.month]} ${start.year}`;
      }
      return `${start.day} – ${end.day} ${months[start.month]} ${start.year}`;
    }
    return `${start.day} ${months[start.month]} – ${end.day} ${months[end.month]} ${start.year}`;
  }
  return `${start.day} ${months[start.month]} ${start.year} HINGGA ${end.day} ${months[end.month]} ${end.year}`;
};

const formatItineraryTime = (timeStr) => {
  if (!timeStr) return '';

  const cleanStr = timeStr.toLowerCase().trim();
  if (cleanStr.includes('pagi') || cleanStr.includes('tengah') || cleanStr.includes('petang') || cleanStr.includes('malam')) {
    return timeStr.replace(':', '.');
  }

  let hours = 0;
  let minutes = 0;
  const matchColon = timeStr.match(/^(\d{1,2})[:.](\d{2})$/);
  const matchFourDigits = timeStr.match(/^(\d{2})(\d{2})$/);
  const matchSingleHour = timeStr.match(/^(\d{1,2})$/);

  if (matchColon) {
    hours = parseInt(matchColon[1], 10);
    minutes = parseInt(matchColon[2], 10);
  } else if (matchFourDigits) {
    hours = parseInt(matchFourDigits[1], 10);
    minutes = parseInt(matchFourDigits[2], 10);
  } else if (matchSingleHour) {
    hours = parseInt(matchSingleHour[1], 10);
    minutes = 0;
  } else {
    return timeStr;
  }

  let period = 'pagi';
  let displayHours = hours;

  if (hours === 12) {
    period = 'tengah hari';
  } else if (hours > 12 && hours < 19) {
    displayHours = hours - 12;
    period = 'petang';
  } else if (hours >= 19) {
    displayHours = hours - 12;
    period = 'malam';
  } else if (hours === 0) {
    displayHours = 12;
    period = 'tengah malam';
  }

  const minStr = minutes === 0 ? '00' : (minutes < 10 ? '0' + minutes : minutes);
  return `${displayHours}.${minStr} ${period}`;
};

const styles = StyleSheet.create({
  coverPage: {
    fontFamily: 'Arial',
    fontSize: 14,
    lineHeight: 1.15,
    paddingHorizontal: 72,
    paddingVertical: 72,
    alignItems: 'center',
    textAlign: 'center',
    color: '#000000',
  },
  coverTitle: {
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#000000',
  },
  coverLabel: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 35, // Ensures "Jarak 4 kali spacing setiap maklumat"
    textTransform: 'uppercase',
    color: '#000000',
  },
  coverLabelCollaborator: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 15, // Dropped only one space (closer to Anjuran)
    textTransform: 'uppercase',
    color: '#000000',
  },
  coverValue: {
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase',
    color: '#000000',
  },
  bodyPage: {
    fontFamily: 'Arial',
    fontSize: 11,
    lineHeight: 1.15,
    paddingHorizontal: 72, // 1 inch margins
    paddingVertical: 72,
    textAlign: 'justify',
    color: '#000000',
  },
  bold: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginBottom: 0, // Tight title spacing
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#000000',
  },
  horizontalRule: {
    borderBottomWidth: 1.5,
    borderColor: '#000000',
    marginTop: 4, // Tightly placed horizontal rule
    marginBottom: 20,
    width: '100%',
  },
  sectionHeader: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: 18,
    marginBottom: 10,
    textTransform: 'uppercase',
    color: '#000000',
  },
  subSectionHeader: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: 14,
    marginBottom: 8,
    color: '#000000',
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 1.15,
    color: '#000000',
  },
  // Outline Level 1 Body (indented under Section Headers)
  indent1Body: {
    paddingLeft: 30,
    marginBottom: 10,
    textAlign: 'justify',
    lineHeight: 1.15,
    color: '#000000',
  },
  // Hierarchical Outline Structures
  indent1: {
    paddingLeft: 30,
  },
  indent2: {
    paddingLeft: 60,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletCell: {
    width: 30, // Fit '2.1' or '3.1.1' perfectly
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#000000',
  },
  contentCell: {
    flex: 1,
    textAlign: 'justify',
    lineHeight: 1.15,
    color: '#000000',
  },
  // Colons Alignment Row
  colonRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  colonLabel: {
    width: 65,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#000000',
  },
  colonSeparator: {
    width: 15,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#000000',
  },
  colonValue: {
    flex: 1,
    color: '#000000',
  },
  // Table Styling
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
    marginTop: 8,
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  tableHeader: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    backgroundColor: '#F2F2F2',
  },
  tableCell: {
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    fontSize: 10,
    color: '#000000',
  },
  tableCellLast: {
    padding: 6,
    fontSize: 10,
    color: '#000000',
  },
  // Vertically stacked signature blocks (one after another)
  signatureContainer: {
    marginTop: 35,
    flexDirection: 'column',
  },
  signatureBlock: {
    width: '100%',
    marginBottom: 35,
  },
  signatureLine: {
    marginTop: 80, // Increased spacing for handwritten signatures
    borderTopWidth: 1,
    borderColor: '#000000',
    marginBottom: 4,
    width: '45%',
  },
  // Centered Container & text alignments for Lampiran A
  centeredContainer: {
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  centeredText: {
    textAlign: 'center',
    color: '#000000',
    lineHeight: 1.15,
    fontSize: 11,
  },
  centeredBoldText: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    lineHeight: 1.15,
    fontSize: 11,
  },
  appendixLabel: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 11,
    alignSelf: 'flex-end',
    marginBottom: 15,
    color: '#000000',
  },
  appendixTitle: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

const PaperWorkDocument = ({ data }) => {
  const totalIncome = data.financials.income.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const totalExpenses = data.financials.expenses.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        {/* Centered USIM Logo Crest at the very top of the page */}
        <Image src={usimLogo} style={{ width: 380, alignSelf: 'center' }} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Text style={styles.coverTitle}>{sanitizeCoverMeta(data.eventMeta.programName)}</Text>

          <Text style={styles.coverLabel}>TARIKH:</Text>
          <Text style={styles.coverValue}>{formatDateRange(data.eventMeta.startDate, data.eventMeta.endDate).toUpperCase()}</Text>

          <Text style={styles.coverLabel}>TEMPAT:</Text>
          <Text style={styles.coverValue}>{data.eventMeta.venue}</Text>

          <Text style={styles.coverLabel}>ANJURAN:</Text>
          <Text style={styles.coverValue}>{sanitizeCoverMeta(data.eventMeta.organizer)}</Text>

          {data.eventMeta.collaborator && (
            <>
              <Text style={styles.coverLabelCollaborator}>DENGAN KERJASAMA:</Text>
              <Text style={styles.coverValue}>{sanitizeCoverMeta(data.eventMeta.collaborator)}</Text>
            </>
          )}
        </View>
      </Page>

      {/* Main Document Body */}
      <Page size="A4" style={styles.bodyPage}>
        <Text style={styles.title}>KERTAS CADANGAN</Text>
        <Text style={styles.title}>{data.eventMeta.programName}</Text>
        <View style={styles.horizontalRule} />

        <Text style={styles.sectionHeader}>1. TUJUAN</Text>
        <Text style={styles.indent1Body}>
          Kertas cadangan ini dikemukakan kepada Jawatankuasa Pengurusan Aktiviti MPP untuk perakuan dan kelulusan bagi menganjurkan {data.eventMeta.programName}.
        </Text>

        <Text style={styles.sectionHeader}>2. LATAR BELAKANG</Text>
        <View style={[styles.rowContainer, styles.indent1]}>
          <Text style={styles.bulletCell}>2.1</Text>
          <Text style={styles.contentCell}>{data.proposalDetails.synopsis}</Text>
        </View>
        {data.proposalDetails.background.map((bg, idx) => (
          <View key={idx} style={[styles.rowContainer, styles.indent1]}>
            <Text style={styles.bulletCell}>2.{idx + 2}</Text>
            <Text style={styles.contentCell}>{bg}</Text>
          </View>
        ))}

        <Text style={styles.sectionHeader}>3. ULASAN PENTADBIRAN</Text>

        {/* 3.1 Objectives */}
        <Text style={[styles.subSectionHeader, styles.indent1]}>3.1 Objektif</Text>
        {data.objectives.map((obj, idx) => (
          <View key={idx} style={[styles.rowContainer, styles.indent2]}>
            <Text style={styles.bulletCell}>3.1.{idx + 1}</Text>
            <Text style={styles.contentCell}>{obj.description} ({obj.giinaElement})</Text>
          </View>
        ))}

        {/* 3.2 Program Details */}
        <Text style={[styles.subSectionHeader, styles.indent1]}>3.2 Butiran Program</Text>
        <View style={[styles.rowContainer, styles.indent2]}>
          <Text style={styles.bulletCell}>3.2.1</Text>
          <View style={{ flex: 1 }}>
            <View style={styles.colonRow}>
              <Text style={styles.colonLabel}>Tarikh</Text>
              <Text style={styles.colonSeparator}>:</Text>
              <Text style={styles.colonValue}>{formatDateRange(data.eventMeta.startDate, data.eventMeta.endDate)}</Text>
            </View>
            <View style={styles.colonRow}>
              <Text style={styles.colonLabel}>Tempat</Text>
              <Text style={styles.colonSeparator}>:</Text>
              <Text style={styles.colonValue}>{data.eventMeta.venue}</Text>
            </View>
            <View style={styles.colonRow}>
              <Text style={styles.colonLabel}>Masa</Text>
              <Text style={styles.colonSeparator}>:</Text>
              <Text style={styles.colonValue}>{data.itinerary.timeRange || 'Rujuk Lampiran B'}</Text>
            </View>
            <View style={styles.colonRow}>
              <Text style={styles.colonLabel}>Peserta</Text>
              <Text style={styles.colonSeparator}>:</Text>
              <Text style={styles.colonValue}>{data.eventMeta.pax}</Text>
            </View>
          </View>
        </View>

        {/* 3.3 Committees */}
        <Text style={[styles.subSectionHeader, styles.indent1]}>3.3 Jawatankuasa Pelaksana</Text>
        <View style={[styles.rowContainer, styles.indent2]}>
          <Text style={styles.bulletCell}>3.3.1</Text>
          <Text style={styles.contentCell}>Sila rujuk Lampiran A.</Text>
        </View>

        {/* 3.4 Itinerary */}
        <Text style={[styles.subSectionHeader, styles.indent1]}>3.4 Atur Cara</Text>
        <View style={[styles.rowContainer, styles.indent2]}>
          <Text style={styles.bulletCell}>3.4.1</Text>
          <Text style={styles.contentCell}>Sila rujuk Lampiran B.</Text>
        </View>

        {/* 3.5 Financials */}
        <Text style={[styles.subSectionHeader, styles.indent1]}>3.5 Implikasi Kewangan</Text>
        <View style={[styles.rowContainer, styles.indent2]}>
          <Text style={styles.bulletCell}>3.5.1</Text>
          <Text style={styles.contentCell}>Sila rujuk Lampiran C.</Text>
        </View>

        <Text style={styles.sectionHeader}>4. PERAKUAN</Text>
        <Text style={styles.indent1Body}>
          Jawatankuasa Pengurusan Aktiviti MPP dengan hormatnya diminta meneliti kertas kerja ini dan jika dipersetujui meluluskan cadangan menganjurkan {data.eventMeta.programName} sebagaimana yang dikemukakan.
        </Text>

        {/* Signatures - stacked vertically one after another */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBlock}>
            <Text style={styles.bold}>Disediakan oleh,</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.bold}>({sanitizeName(data.signatures.preparedBy.name).toUpperCase()})</Text>
            <Text>{data.signatures.preparedBy.role}</Text>
            <Text>{data.eventMeta.programName}</Text>
            <Text>Tarikh:</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.bold}>Disemak oleh,</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.bold}>({sanitizeName(data.signatures.reviewedBy.name).toUpperCase()})</Text>
            <Text>{data.signatures.reviewedBy.role}</Text>
            <Text>{data.eventMeta.organizer}</Text>
            <Text>Tarikh:</Text>
          </View>
        </View>
      </Page>

      {/* Lampiran A - Jawatankuasa */}
      <Page size="A4" style={styles.bodyPage}>
        <Text style={styles.appendixLabel}>LAMPIRAN A</Text>
        <Text style={styles.appendixTitle}>JAWATANKUASA PELAKSANA</Text>
        <Text style={styles.appendixTitle}>{data.eventMeta.programName}</Text>
        <View style={styles.horizontalRule} />

        <View style={styles.centeredContainer}>
          <View style={{ marginBottom: 15, alignItems: 'center' }}>
            <Text style={styles.centeredBoldText}>PENAUNG</Text>
            <Text style={styles.centeredText}>{sanitizeName(data.committee.patron.name)}</Text>
            <Text style={styles.centeredText}>{data.committee.patron.role}</Text>
          </View>

          <View style={{ marginBottom: 15, alignItems: 'center' }}>
            <Text style={styles.centeredBoldText}>PENASIHAT</Text>
            <Text style={styles.centeredText}>{sanitizeName(data.committee.advisor.name)}</Text>
            <Text style={styles.centeredText}>{data.committee.advisor.role}</Text>
            {data.committee.advisor.pejabat ? (
              <Text style={styles.centeredText}>{data.committee.advisor.pejabat}</Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 15, alignItems: 'center' }}>
            <Text style={styles.centeredBoldText}>PENYELARAS</Text>
            <Text style={styles.centeredText}>{sanitizeName(data.committee.coordinator.name)}</Text>
            <Text style={styles.centeredText}>{data.committee.coordinator.role}</Text>
            {data.committee.coordinator.pejabat ? (
              <Text style={styles.centeredText}>{data.committee.coordinator.pejabat}</Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 15, alignItems: 'center' }}>
            <Text style={styles.centeredBoldText}>PENGARAH</Text>
            <Text style={styles.centeredText}>{sanitizeName(data.committee.director.name)} ({data.committee.director.matric})</Text>
          </View>

          <View style={{ marginBottom: 15, alignItems: 'center' }}>
            <Text style={styles.centeredBoldText}>SETIAUSAHA</Text>
            <Text style={styles.centeredText}>{sanitizeName(data.committee.secretary.name)} ({data.committee.secretary.matric})</Text>
          </View>

          {data.committee.subCommittees.map((sub, idx) => (
            <View key={idx} style={{ marginBottom: 15, alignItems: 'center' }}>
              <Text style={styles.centeredBoldText}>{sub.roleName.toUpperCase()}</Text>
              {sub.members.map((m, midx) => (
                <Text key={midx} style={styles.centeredText}>{sanitizeName(m.name)} ({m.matric})</Text>
              ))}
            </View>
          ))}
        </View>
      </Page>

      {/* Lampiran B - Tentatif */}
      <Page size="A4" style={styles.bodyPage}>
        <Text style={styles.appendixLabel}>LAMPIRAN B</Text>
        <Text style={styles.appendixTitle}>ATUR CARA</Text>
        <Text style={styles.appendixTitle}>{data.eventMeta.programName}</Text>
        <View style={styles.horizontalRule} />

        <View style={{ marginBottom: 15 }}>
          <View style={styles.colonRow}>
            <Text style={styles.colonLabel}>TARIKH</Text>
            <Text style={styles.colonSeparator}>:</Text>
            <Text style={[styles.colonValue, styles.bold]}>{data.itinerary.date.toUpperCase()}</Text>
          </View>
          <View style={styles.colonRow}>
            <Text style={styles.colonLabel}>MASA</Text>
            <Text style={styles.colonSeparator}>:</Text>
            <Text style={[styles.colonValue, styles.bold]}>{data.itinerary.timeRange.toUpperCase()}</Text>
          </View>
          <View style={styles.colonRow}>
            <Text style={styles.colonLabel}>TEMPAT</Text>
            <Text style={styles.colonSeparator}>:</Text>
            <Text style={[styles.colonValue, styles.bold]}>{data.itinerary.venue.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: '30%', fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>MASA</Text>
            <Text style={[styles.tableCellLast, { width: '70%', fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>AKTIVITI</Text>
          </View>
          {data.itinerary.activities.map((act, idx) => (
            <View key={idx} style={idx === data.itinerary.activities.length - 1 ? styles.tableRowLast : styles.tableRow}>
              <Text style={[styles.tableCell, { width: '30%', textAlign: 'center' }]}>{formatItineraryTime(act.time)}</Text>
              <Text style={[styles.tableCellLast, { width: '70%', paddingLeft: 10 }]}>{act.activity}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Lampiran C - Kewangan */}
      <Page size="A4" style={styles.bodyPage}>
        <Text style={styles.appendixLabel}>LAMPIRAN C</Text>
        <Text style={styles.appendixTitle}>IMPLIKASI KEWANGAN</Text>
        <Text style={styles.appendixTitle}>{data.eventMeta.programName}</Text>
        <View style={styles.horizontalRule} />

        <Text style={styles.bold}>1. Sumber Pendapatan</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: '10%', fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>BIL.</Text>
            <Text style={[styles.tableCell, { width: '60%', fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>SUMBER</Text>
            <Text style={[styles.tableCellLast, { width: '30%', textAlign: 'center', fontFamily: 'Helvetica-Bold' }]}>JUMLAH (RM)</Text>
          </View>
          {data.financials.income.map((inc, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}>{idx + 1}</Text>
              <Text style={[styles.tableCell, { width: '60%' }]}>{inc.source}</Text>
              <Text style={[styles.tableCellLast, { width: '30%', textAlign: 'right' }]}>{parseFloat(inc.amount).toFixed(2)}</Text>
            </View>
          ))}
          <View style={[styles.tableRowLast, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: '70%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>JUMLAH KESELURUHAN</Text>
            <Text style={[styles.tableCellLast, { width: '30%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>{totalIncome.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={[styles.bold, { marginTop: 15 }]}>2. Anggaran Perbelanjaan</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: '8%', fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>BIL.</Text>
            <Text style={[styles.tableCell, { width: '27%', fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>PERKARA</Text>
            <Text style={[styles.tableCell, { width: '30%', fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>PENGIRAAN</Text>
            <Text style={[styles.tableCell, { width: '15%', textAlign: 'center', fontFamily: 'Helvetica-Bold' }]}>JUMLAH (RM)</Text>
            <Text style={[styles.tableCellLast, { width: '20%', fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>SUMBER</Text>
          </View>
          {data.financials.expenses.map((exp, idx) => (
            <View key={idx} style={idx === data.financials.expenses.length - 1 ? styles.tableRowLast : styles.tableRow}>
              <Text style={[styles.tableCell, { width: '8%', textAlign: 'center' }]}>{idx + 1}</Text>
              <Text style={[styles.tableCell, { width: '27%' }]}>{exp.item} ({exp.category})</Text>
              <Text style={[styles.tableCell, { width: '30%' }]}>{exp.calculation}</Text>
              <Text style={[styles.tableCell, { width: '15%', textAlign: 'right' }]}>{parseFloat(exp.amount).toFixed(2)}</Text>
              <Text style={[styles.tableCellLast, { width: '20%' }]}>{exp.fundSource || 'Peruntukan Mengurus'}</Text>
            </View>
          ))}
          <View style={[styles.tableRowLast, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: '65%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>JUMLAH KESELURUHAN</Text>
            <Text style={[styles.tableCell, { width: '15%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>{totalExpenses.toFixed(2)}</Text>
            <Text style={[styles.tableCellLast, { width: '20%', backgroundColor: '#F2F2F2' }]}></Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PaperWorkDocument;
