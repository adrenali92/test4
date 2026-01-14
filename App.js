import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native';

const getThemeColors = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return {
      primary: '#FCE7F3',
      background: '#FFF7ED',
      text: '#1F2937',
      accent: '#F472B6',
    };
  }
  if (hour >= 12 && hour < 17) {
    return {
      primary: '#DBEAFE',
      background: '#F8FAFC',
      text: '#0F172A',
      accent: '#38BDF8',
    };
  }
  if (hour >= 17 && hour < 21) {
    return {
      primary: '#0EA5E9',
      background: '#0F172A',
      text: '#F8FAFC',
      accent: '#F97316',
    };
  }
  return {
    primary: '#111827',
    background: '#020617',
    text: '#E2E8F0',
    accent: '#22D3EE',
  };
};

const Section = ({ title, subtitle, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
    {children}
  </View>
);

const Pill = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.pill, active && styles.pillActive]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const ActionCard = ({ title, description, onPress, cta }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.85}>
    <Text style={styles.actionTitle}>{title}</Text>
    <Text style={styles.actionDescription}>{description}</Text>
    <Text style={styles.actionCta}>{cta}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [mood, setMood] = useState('Neugierig');
  const [focus, setFocus] = useState('Mut');
  const theme = getThemeColors();
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  const moodPrompts = useMemo(
    () => ({
      Neugierig: 'Heute: Stell eine Frage, die dich ehrlich interessiert.',
      Romantisch: 'Heute: Sag jemandem, was du an ihm/ihr magst.',
      Abenteuer: 'Heute: Plane ein kleines Risiko mit großem Lächeln.',
      Ruhig: 'Heute: Wähle Verbindung ohne Druck.',
    }),
    []
  );

  const focusPrompts = useMemo(
    () => ({
      Mut: 'Ein kurzer Schritt in Richtung Kontakt ist ein Sieg.',
      Klarheit: 'Du darfst Grenzen setzen und dich dabei gut fühlen.',
      Vertrauen: 'Zuhören ist der schnellste Weg zu Nähe.',
      Energie: 'Kurze Nachrichten, klare Absicht, sanfter Ton.',
    }),
    []
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.hero, { backgroundColor: theme.primary }]}> 
          <Text style={[styles.heroEyebrow, { color: theme.text }]}>KRIMI & KENNLERNEN</Text>
          <Text style={[styles.heroTitle, { color: theme.text }]}>TrueMatch</Text>
          <Text style={[styles.heroSubtitle, { color: theme.text }]}
          >Eine App, die Motivation, Dating und True Crime zu klugen Dates verbindet.</Text>
        </View>

        <View style={[styles.mainContent, isTablet && styles.tabletContent]}>
          <Section
            title="Mood-Compass"
            subtitle="Wähle deine Stimmung und hol dir den passenden Impuls."
          >
            <View style={styles.pillRow}>
              {['Neugierig', 'Romantisch', 'Abenteuer', 'Ruhig'].map((item) => (
                <Pill
                  key={item}
                  label={item}
                  active={mood === item}
                  onPress={() => setMood(item)}
                />
              ))}
            </View>
            <Text style={styles.promptText}>{moodPrompts[mood]}</Text>
          </Section>

          <Section
            title="Case des Tages"
            subtitle="Ein Mini-Fall für Gesprächsstoff und sichere Dates."
          >
            <View style={styles.caseCard}>
              <Text style={styles.caseTitle}>Der verschwundene Café-Gast</Text>
              <Text style={styles.caseMeta}>📍 Berlin • 🕰️ 7 Minuten</Text>
              <Text style={styles.caseBody}>
                Eine Person verlässt ein Café, lässt Tasche und Telefon zurück. Was ist ein
                plausibler Ablauf ohne True-Crime-Klischees? Findet gemeinsam drei
                harmlose Erklärungen und eine, die ihr ausschließt.
              </Text>
              <View style={styles.caseTags}>
                {['Empathie', 'Logik', 'Gesprächsstart'].map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Section>

          <Section
            title="Dating-Plan in 3 Schritten"
            subtitle="Motiviert, achtsam, sicher."
          >
            {[
              { step: '1', title: 'Check-in', text: 'Frage: "Was brauchst du heute für ein gutes Date?"' },
              { step: '2', title: 'Story-Spark', text: 'Teile eine kurze True-Crime-Story und hör zu.' },
              { step: '3', title: 'Exit-Plan', text: 'Gemeinsames Signal für Pausen oder Ende.' },
            ].map((item) => (
              <View key={item.step} style={styles.stepRow}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{item.step}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{item.title}</Text>
                  <Text style={styles.stepText}>{item.text}</Text>
                </View>
              </View>
            ))}
          </Section>

          <Section
            title="Motivationsfokus"
            subtitle="Worauf möchtest du dich heute konzentrieren?"
          >
            <View style={styles.pillRow}>
              {['Mut', 'Klarheit', 'Vertrauen', 'Energie'].map((item) => (
                <Pill
                  key={item}
                  label={item}
                  active={focus === item}
                  onPress={() => setFocus(item)}
                />
              ))}
            </View>
            <Text style={styles.promptText}>{focusPrompts[focus]}</Text>
          </Section>

          <Section
            title="Smart Safety"
            subtitle="Kleine Checkliste für sichere Dates."
          >
            {[
              'Trefft euch zuerst an einem öffentlichen Ort.',
              'Teile live deinen Standort mit einer Vertrauensperson.',
              'Behalte dein Getränk immer im Blick.',
              'Sag klar Nein, wenn etwas nicht passt.',
            ].map((item) => (
              <View key={item} style={styles.checkRow}>
                <Text style={styles.checkIcon}>✅</Text>
                <Text style={styles.checkText}>{item}</Text>
              </View>
            ))}
          </Section>

          <Section
            title="Quick Actions"
            subtitle="Drei Klicks, die euch näherbringen."
          >
            <ActionCard
              title="Date-Idee: Cold Case Walk"
              description="Spaziergang + Mini-Storytelling. Jede:r erzählt eine hypothetische Spur." 
              cta="Idee speichern"
              onPress={() => Linking.openURL('https://www.meetup.com/')}
            />
            <ActionCard
              title="Audio-Impuls: 2-Minuten-Mut"
              description="Kurzer Motivationsboost vor dem Date."
              cta="Jetzt anhören"
              onPress={() => Linking.openURL('https://open.spotify.com')}
            />
            <ActionCard
              title="Chat-Vorlage"
              description="Hey! Lust auf einen Krimi-Café-Check? 30 Minuten, safe & entspannt."
              cta="Text kopieren"
              onPress={() => Linking.openURL('https://www.notion.so')}
            />
          </Section>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  hero: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 16,
  },
  heroEyebrow: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  mainContent: {
    paddingHorizontal: 20,
  },
  tabletContent: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 820,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  pillActive: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
  },
  pillText: {
    color: '#0F172A',
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  promptText: {
    fontSize: 16,
    color: '#0F172A',
    lineHeight: 22,
  },
  caseCard: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#F1F5F9',
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  caseMeta: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 10,
  },
  caseBody: {
    fontSize: 15,
    color: '#0F172A',
    lineHeight: 21,
  },
  caseTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  tag: {
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  stepText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  checkText: {
    fontSize: 15,
    color: '#0F172A',
    flex: 1,
  },
  actionCard: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#0F172A',
    marginBottom: 12,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  actionDescription: {
    color: '#CBD5F5',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  actionCta: {
    color: '#38BDF8',
    fontWeight: '700',
    fontSize: 14,
  },
});
