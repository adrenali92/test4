import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';

const facts = [
  { label: 'Hauptstadt', value: 'Bukarest' },
  { label: 'Einwohner', value: 'ca. 19 Mio.' },
  { label: 'Fläche', value: '238.397 km²' },
  { label: 'Sprache', value: 'Rumänisch' },
  { label: 'Währung', value: 'Rumänischer Leu (RON)' },
  { label: 'EU-Mitglied', value: 'seit 2007' },
];

const highlights = [
  {
    emoji: '🏰',
    title: 'Transsilvanien',
    text: 'Mittelalterliche Städte, Kirchenburgen, Karpatenlandschaften und Schloss Bran machen die Region weltberühmt.',
  },
  {
    emoji: '🌊',
    title: 'Donaudelta',
    text: 'Eines der besterhaltenen Deltas Europas und UNESCO-Welterbe mit über 300 Vogelarten.',
  },
  {
    emoji: '🏙️',
    title: 'Bukarest',
    text: 'Die Hauptstadt verbindet Belle-Époque-Architektur, breite Boulevards, Parks und ein lebendiges Kulturleben.',
  },
  {
    emoji: '⛰️',
    title: 'Karpaten',
    text: 'Gebirge, Wälder und Wanderwege prägen einen großen Teil des Landes und bieten Lebensraum für Wildtiere.',
  },
];

const timeline = [
  { year: '1859', text: 'Vereinigung der Fürstentümer Moldau und Walachei als Grundlage des modernen Rumäniens.' },
  { year: '1918', text: 'Große Vereinigung: Siebenbürgen schließt sich Rumänien an.' },
  { year: '1989', text: 'Ende der kommunistischen Diktatur und Beginn demokratischer Reformen.' },
  { year: '2007', text: 'Rumänien wird Mitglied der Europäischen Union.' },
];

const travelTips = [
  'Probiere Sarmale, Mămăligă und Cozonac.',
  'Nutze Züge für längere Strecken und plane in Bergregionen mehr Zeit ein.',
  'In Kirchen und Klöstern sind respektvolle Kleidung und leises Verhalten wichtig.',
  'Die beste Reisezeit für Städte und Natur ist oft Frühling bis Herbst.',
];

const sources = [
  { title: 'EU-Länderprofil Rumänien', url: 'https://european-union.europa.eu/principles-countries-history/eu-countries/romania_de' },
  { title: 'UNESCO: Donaudelta', url: 'https://whc.unesco.org/en/list/588/' },
  { title: 'Offizielle Tourismusinfos', url: 'https://www.romaniatourism.com/' },
];

const openUrl = (url) => Linking.openURL(url);

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&w=1200&q=80' }}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.flag}>🇷🇴</Text>
            <Text style={styles.heroTitle}>Rumänien entdecken</Text>
            <Text style={styles.heroSubtitle}>
              Ein kompakter Reiseführer zu Kultur, Natur, Geschichte und praktischen Fakten.
            </Text>
          </View>
        </ImageBackground>

        <Section title="Kurzfakten">
          <View style={styles.factGrid}>
            {facts.map((fact) => (
              <View key={fact.label} style={styles.factCard}>
                <Text style={styles.factLabel}>{fact.label}</Text>
                <Text style={styles.factValue}>{fact.value}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Was Rumänien besonders macht">
          {highlights.map((item) => (
            <View key={item.title} style={styles.highlightCard}>
              <Text style={styles.highlightEmoji}>{item.emoji}</Text>
              <View style={styles.highlightTextWrap}>
                <Text style={styles.highlightTitle}>{item.title}</Text>
                <Text style={styles.paragraph}>{item.text}</Text>
              </View>
            </View>
          ))}
        </Section>

        <Section title="Geschichte auf einen Blick">
          {timeline.map((event) => (
            <View key={event.year} style={styles.timelineRow}>
              <Text style={styles.timelineYear}>{event.year}</Text>
              <Text style={styles.timelineText}>{event.text}</Text>
            </View>
          ))}
        </Section>

        <Section title="Reisetipps">
          {travelTips.map((tip) => (
            <Text key={tip} style={styles.tip}>• {tip}</Text>
          ))}
        </Section>

        <Section title="Quellen & weiter lesen">
          {sources.map((source) => (
            <TouchableOpacity key={source.url} style={styles.linkButton} onPress={() => openUrl(source.url)}>
              <Text style={styles.linkButtonText}>{source.title}</Text>
            </TouchableOpacity>
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#07111f',
  },
  container: {
    flex: 1,
    backgroundColor: '#eef4fb',
  },
  content: {
    paddingBottom: 28,
  },
  hero: {
    minHeight: 340,
    justifyContent: 'flex-end',
  },
  heroImage: {
    opacity: 0.9,
  },
  heroOverlay: {
    backgroundColor: 'rgba(7, 17, 31, 0.62)',
    padding: 24,
    paddingTop: 70,
  },
  flag: {
    fontSize: 54,
    marginBottom: 8,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: '#e6eef8',
    fontSize: 17,
    lineHeight: 25,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    marginHorizontal: 16,
    marginTop: 18,
    padding: 18,
    shadowColor: '#123',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  sectionTitle: {
    color: '#123c69',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 14,
  },
  factGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  factCard: {
    backgroundColor: '#f1f6ff',
    borderRadius: 16,
    padding: 14,
    width: '48%',
  },
  factLabel: {
    color: '#5d6f86',
    fontSize: 13,
    marginBottom: 4,
  },
  factValue: {
    color: '#0b2545',
    fontSize: 16,
    fontWeight: '700',
  },
  highlightCard: {
    flexDirection: 'row',
    backgroundColor: '#fbfcff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5edf7',
  },
  highlightEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  highlightTextWrap: {
    flex: 1,
  },
  highlightTitle: {
    color: '#0b2545',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  paragraph: {
    color: '#40566d',
    fontSize: 15,
    lineHeight: 22,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  timelineYear: {
    color: '#ffcc29',
    backgroundColor: '#123c69',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: '800',
    minWidth: 62,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlign: 'center',
    overflow: 'hidden',
    marginRight: 12,
  },
  timelineText: {
    flex: 1,
    color: '#334e68',
    fontSize: 15,
    lineHeight: 22,
  },
  tip: {
    color: '#334e68',
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 8,
  },
  linkButton: {
    backgroundColor: '#002b7f',
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
  },
  linkButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
