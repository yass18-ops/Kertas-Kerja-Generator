import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import usimLogo from '../assets/usim-logo.png';

const styles = StyleSheet.create({
  coverPage: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    lineHeight: 1.15,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 71,
    marginBottom: 30,
  },
  bodyPage: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.15,
    padding: 50,
    textAlign: 'justify',
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  coverTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    marginTop: 15,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  paragraph: {
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 15,
  },
  listBullet: {
    width: 20,
  },
  listContent: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  colLabel: {
    width: '30%',
    fontFamily: 'Helvetica-Bold',
  },
  colValue: {
    width: '70%',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  tableHeader: {
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#e5e5e5',
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  tableCellLast: {
    padding: 5,
  },
  signatureContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBlock: {
    width: '45%',
  },
  signatureLine: {
    marginTop: 60,
    borderTopWidth: 1,
    borderColor: '#000',
    marginBottom: 5,
  },
  pageBreak: {
    marginBottom: 20,
  }
});

const PaperWorkDocument = ({ data }) => {
  const totalIncome = data.financials.income.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const totalExpenses = data.financials.expenses.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Image style={styles.logo} src={usimLogo} />
        <Text style={styles.coverTitle}>KERTAS KERJA CADANGAN</Text>
        <Text style={[styles.coverTitle, { marginTop: 20, marginBottom: 50 }]}>{data.eventMeta.programName}</Text>
        
        <Text style={styles.bold}>TARIKH:</Text>
        <Text style={styles.paragraph}>{data.eventMeta.startDate} hingga {data.eventMeta.endDate}</Text>

        <Text style={styles.bold}>TEMPAT:</Text>
        <Text style={styles.paragraph}>{data.eventMeta.venue}</Text>

        <Text style={styles.bold}>ANJURAN:</Text>
        <Text style={styles.paragraph}>{data.eventMeta.organizer}</Text>

        {data.eventMeta.collaborator && (
          <>
            <Text style={styles.bold}>DENGAN KERJASAMA:</Text>
            <Text style={styles.paragraph}>{data.eventMeta.collaborator}</Text>
          </>
        )}
      </Page>

      {/* Body Pages */}
      <Page size="A4" style={styles.bodyPage}>
        <Text style={styles.title}>KERTAS KERJA: {data.eventMeta.programName}</Text>

        <Text style={styles.sectionTitle}>1.0 TUJUAN</Text>
        <Text style={styles.paragraph}>{data.proposalDetails.purpose}</Text>

        <Text style={styles.sectionTitle}>2.0 PENGENALAN DAN LATAR BELAKANG</Text>
        <Text style={styles.paragraph}>{data.proposalDetails.synopsis}</Text>
        {data.proposalDetails.background.map((bg, idx) => (
          <View key={idx} style={styles.listItem}>
            <Text style={styles.listBullet}>2.{idx + 1}</Text>
            <Text style={styles.listContent}>{bg}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>3.0 OBJEKTIF</Text>
        {data.objectives.map((obj, idx) => (
          <View key={idx} style={styles.listItem}>
            <Text style={styles.listBullet}>3.{idx + 1}</Text>
            <Text style={styles.listContent}>{obj.description} ({obj.giinaElement})</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>4.0 MAKLUMAT PROGRAM</Text>
        <View style={styles.row}>
          <Text style={styles.colLabel}>Tarikh:</Text>
          <Text style={styles.colValue}>{data.eventMeta.startDate} - {data.eventMeta.endDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLabel}>Tempat:</Text>
          <Text style={styles.colValue}>{data.eventMeta.venue}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLabel}>Anjuran:</Text>
          <Text style={styles.colValue}>{data.eventMeta.organizer}</Text>
        </View>

        <Text style={styles.sectionTitle}>5.0 JAWATANKUASA PELAKSANA</Text>
        <Text style={styles.paragraph}>Sila rujuk Lampiran A.</Text>

        <Text style={styles.sectionTitle}>6.0 TENTATIF PROGRAM</Text>
        <Text style={styles.paragraph}>Sila rujuk Lampiran B.</Text>

        <Text style={styles.sectionTitle}>7.0 IMPLIKASI KEWANGAN</Text>
        <Text style={styles.paragraph}>Sila rujuk Lampiran C.</Text>

        <Text style={styles.sectionTitle}>8.0 PENUTUP</Text>
        <Text style={styles.paragraph}>
          Diharapkan kertas kerja ini mendapat pertimbangan dan kelulusan daripada pihak pengurusan.
        </Text>

        {/* Signatures */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBlock}>
            <Text style={styles.bold}>Disediakan oleh:</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.bold}>{data.signatures.preparedBy.name}</Text>
            <Text>{data.signatures.preparedBy.role}</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.bold}>Disemak oleh:</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.bold}>{data.signatures.reviewedBy.name}</Text>
            <Text>{data.signatures.reviewedBy.role}</Text>
          </View>
        </View>
      </Page>

      {/* Lampiran A - Jawatankuasa */}
      <Page size="A4" style={styles.bodyPage}>
        <Text style={[styles.title, { marginBottom: 30 }]}>LAMPIRAN A: JAWATANKUASA PELAKSANA</Text>

        <View style={styles.row}>
          <Text style={styles.colLabel}>Penaung:</Text>
          <Text style={styles.colValue}>{data.committee.patron.name} ({data.committee.patron.role})</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLabel}>Penasihat:</Text>
          <Text style={styles.colValue}>{data.committee.advisor.name} ({data.committee.advisor.role})</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLabel}>Penyelaras:</Text>
          <Text style={styles.colValue}>{data.committee.coordinator.name} ({data.committee.coordinator.role})</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLabel}>Pengarah:</Text>
          <Text style={styles.colValue}>{data.committee.director.name} ({data.committee.director.matric})</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colLabel}>Setiausaha:</Text>
          <Text style={styles.colValue}>{data.committee.secretary.name} ({data.committee.secretary.matric})</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Ahli Jawatankuasa (AJK)</Text>
        {data.committee.subCommittees.map((sub, idx) => (
          <View key={idx} style={{ marginTop: 10 }}>
            <Text style={styles.bold}>{sub.roleName}:</Text>
            {sub.members.map((m, midx) => (
              <Text key={midx} style={{ paddingLeft: 20 }}>- {m.name} ({m.matric})</Text>
            ))}
          </View>
        ))}
      </Page>

      {/* Lampiran B - Tentatif */}
      <Page size="A4" style={styles.bodyPage}>
        <Text style={[styles.title, { marginBottom: 30 }]}>LAMPIRAN B: TENTATIF PROGRAM</Text>
        <Text style={styles.paragraph}><Text style={styles.bold}>Tarikh:</Text> {data.itinerary.date}</Text>
        <Text style={styles.paragraph}><Text style={styles.bold}>Masa:</Text> {data.itinerary.timeRange}</Text>
        <Text style={styles.paragraph}><Text style={styles.bold}>Tempat:</Text> {data.itinerary.venue}</Text>
        
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Masa</Text>
            <Text style={[styles.tableCellLast, { width: '70%' }]}>Aktiviti</Text>
          </View>
          {data.itinerary.activities.map((act, idx) => (
            <View key={idx} style={idx === data.itinerary.activities.length - 1 ? styles.tableRowLast : styles.tableRow}>
              <Text style={[styles.tableCell, { width: '30%' }]}>{act.time}</Text>
              <Text style={[styles.tableCellLast, { width: '70%' }]}>{act.activity}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Lampiran C - Kewangan */}
      <Page size="A4" style={styles.bodyPage}>
        <Text style={[styles.title, { marginBottom: 30 }]}>LAMPIRAN C: IMPLIKASI KEWANGAN</Text>
        
        <Text style={styles.sectionTitle}>1. PENDAPATAN</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: '10%' }]}>Bil</Text>
            <Text style={[styles.tableCell, { width: '60%' }]}>Sumber</Text>
            <Text style={[styles.tableCellLast, { width: '30%', textAlign: 'right' }]}>Jumlah (RM)</Text>
          </View>
          {data.financials.income.map((inc, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '10%' }]}>{idx + 1}</Text>
              <Text style={[styles.tableCell, { width: '60%' }]}>{inc.source}</Text>
              <Text style={[styles.tableCellLast, { width: '30%', textAlign: 'right' }]}>{parseFloat(inc.amount).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.tableRowLast}>
            <Text style={[styles.tableCell, { width: '70%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>JUMLAH PENDAPATAN</Text>
            <Text style={[styles.tableCellLast, { width: '30%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>{totalIncome.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>2. PERBELANJAAN</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: '10%' }]}>Bil</Text>
            <Text style={[styles.tableCell, { width: '30%' }]}>Perkara</Text>
            <Text style={[styles.tableCell, { width: '40%' }]}>Pengiraan</Text>
            <Text style={[styles.tableCellLast, { width: '20%', textAlign: 'right' }]}>Jumlah (RM)</Text>
          </View>
          {data.financials.expenses.map((exp, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '10%' }]}>{idx + 1}</Text>
              <Text style={[styles.tableCell, { width: '30%' }]}>{exp.item} ({exp.category})</Text>
              <Text style={[styles.tableCell, { width: '40%' }]}>{exp.calculation}</Text>
              <Text style={[styles.tableCellLast, { width: '20%', textAlign: 'right' }]}>{parseFloat(exp.amount).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.tableRowLast}>
            <Text style={[styles.tableCell, { width: '80%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>JUMLAH PERBELANJAAN</Text>
            <Text style={[styles.tableCellLast, { width: '20%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>{totalExpenses.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PaperWorkDocument;
