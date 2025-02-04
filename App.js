import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Image, 
  useWindowDimensions,
  Platform,
  Animated,
  Modal
} from 'react-native';

// Dynamic Theme Constants
const getThemeColors = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) { // Morning
    return {
      primary: '#87CEEB', // Light Sky Blue
      background: '#E6F4F1', // Very Light Cyan
      text: '#333333',
      accent: '#4682B4' // Steel Blue
    };
  } else if (hour >= 12 && hour < 17) { // Afternoon
    return {
      primary: '#F0F8FF', // Light Sea Green
      background: '#F0F8FF', // Alice Blue
      text: '#333333',
      accent: '87CEEB' // Forest Green
    };
  } else if (hour >= 17 && hour < 21) { // Evening
    return {
      primary: '#4169E1', // Royal Blue
      background: '#F5F5F5', // White Smoke
      text: '#333333',
      accent: '#8A2BE2' // Blue Violet
    };
  } else { // Night
    return {
      primary: '#191970', // Midnight Blue
      background: '#2F4F4F', // Dark Slate Gray
      text: '#E0E0E0',
      accent: '#00CED1' // Dark Turquoise
    };
  }
};

// Reusable Components
const Section = ({ title, children, style }) => (
  <View style={[styles.section, style]}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const LinkButton = ({ title, url }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => Linking.openURL(url)}
    activeOpacity={0.7}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function App() {
  // State Management
  const [language, setLanguage] = useState('de');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Translations
  const translations = {
    de: {
      about: 'Über mich',
      resume: 'Lebenslauf',
      workSamples: 'Arbeitsproben',
      certificates: 'Zeugnisse',
      skills: 'Kenntnisse & Fähigkeiten',
      languages: 'Sprachen'
    },
    en: {
      about: 'About Me',
      resume: 'Resume',
      workSamples: 'Work Samples',
      certificates: 'Certificates',
      skills: 'Skills & Competencies',
      languages: 'Languages'
    }
  };

  // Dynamic Styling
  const theme = getThemeColors();
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  // Parallax Effect
  const profileImageTransform = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.8],
    extrapolate: 'clamp'
  });

  // Social Media & Additional Interactions
  const openSocialMedia = (platform) => {
    const urls = {
      instagram: 'https://instagram.com/andrenalin_now',
      blog: 'http://neusucht.blog'
    };
    Linking.openURL(urls[platform]);
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: isDarkMode ? '#121212' : theme.background 
      }
    ]}>
      {/* Language Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TouchableOpacity 
            style={styles.languageOption}
            onPress={() => {
              setLanguage('de');
              setLanguageModalVisible(false);
            }}
          >
            <Text>🇩🇪 Deutsch</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.languageOption}
            onPress={() => {
              setLanguage('en');
              setLanguageModalVisible(false);
            }}
          >
            <Text>🇬🇧 English</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>
            <Text>{language === 'de' ? 'DE' : 'ENG'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
            <Text>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>

        {/* Header with Parallax */}
        <Animated.View 
          style={[
            styles.header, 
            { 
              transform: [{ scale: profileImageTransform }],
              backgroundColor: isDarkMode ? '#333' : theme.primary 
            }
          ]}
        >
          <Animated.Image
            source={{ uri: 'https://i.ibb.co/fVft0ZBc/IMG-3460.jpg' }}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
            André Beinke
          </Text>
          <Text style={[styles.subtitle, { color: isDarkMode ? '#ddd' : '#333' }]}>
            {translations[language].about}
          </Text>
        </Animated.View>

        {/* Social Media Links */}
        <View style={styles.socialContainer}>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => openSocialMedia('instagram')}
          >
            <Text>📸 Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => openSocialMedia('blog')}
          >
            <Text>📝 Blog</Text>
          </TouchableOpacity>
        </View>

        {/* Rest of the Original Content */}
        <View style={[styles.mainContent, isTablet && styles.tabletContent]}>
          {/* About Me Section */}
          <Section title={translations[language].about}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactItem}>Geboren: 20. November 1987</Text>
              <Text style={styles.contactItem}>Weserstraße 57, 12045 Berlin</Text>
              <Text 
                style={styles.contactItemLink}
                onPress={() => Linking.openURL('mailto:andre.beinke@gmx.de')}
              >
                E-Mail: andre.beinke@gmx.de
              </Text>
              <Text 
                style={styles.contactItemLink}
                onPress={() => Linking.openURL('tel:+4915753082479')}
              >
                Tel: +49 157 530 824 79
              </Text>
            </View>
          </Section>

          {/* Resume Section */}
          <Section title={translations[language].resume}>
            {[
              { date: "Dez. 2023 - heute", description: "Redakteur bei supa.stories GmbH" },
              { date: "Okt. 2020 - März 2023", description: "Masterstudium Medien und Politische Kommunikation, Freie Universität Berlin" },
              { date: "März - Dez. 2023", description: "Freier Journalist bei Märkische Allgemeine Zeitung & Berliner Zeitung" },
              { date: "Sept. 2022 - Feb. 2023", description: "Social Media-Redakteur bei ZDF Digital GmbH" },
               { date: "März 2021 - Sept. 2022", description: "Redaktioneller Mitarbeiter bei dpa" },
            { date: "Sept. 2019 - Sept. 2020", description: "Castingredakteur bei Story House Production GmbH" },
  
            ].map((experience, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experienceDate}>{experience.date}</Text>
                <Text style={styles.experienceDescription}>{experience.description}</Text>
              </View>
            ))}
          </Section>

            {/* Work Samples */}
        <Section title="Arbeitsproben">
          {[
            { title: "Rassehunde-Ausstellung Bericht", url: "https://www.zeit.de/news/2021-10/16/rostocker-rassehunde-ausstellung-mit-melderekord" },
            { title: "Olivia Jones Porträt", url: "https://www.t-online.de/unterhaltung/stars/id_91181584/dragqueen-olivia-jones-wuenscht-sich-mehr-sinnfluencer-.html" },
            { title: "Umwelt Crime: Fischsterben in der Oder", url: "https://www.zdf.de/nachrichten/panorama/oder-fischsterben-fluss-umweltkatastrophe-100.html" }
          ].map((link, index) => (
            <LinkButton 
              key={index} 
              title={link.title} 
              url={link.url} 
            />
          ))}
        </Section>

          {/* Skills Section */}
          <Section title={translations[language].skills}>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillTitle}>{translations[language].languages}</Text>
              {[
                "Deutsch: Muttersprache",
                "Englisch: Fließend",
                "Französisch: Grundkenntnisse",
                "Arabisch: Grundkenntnisse (مرحبًا!)"
              ].map((language, index) => (
                <Text key={index} style={styles.contactItem}>{language}</Text>
              ))}
            </View>
          </Section>
           {/* Certificates */}
        <Section title="Zeugnisse">
          <LinkButton
            title="Download (PDF)"
            url="https://drive.google.com/file/d/19tSJ4LejAU3hpPsC4kZxE0KN3xW7NqwI/view?usp=sharing"
          />
        </Section>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 André Beinke</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 10
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  mainContent: {
    padding: 16,
  },
  tabletContent: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  contactInfo: {
    padding: 16,
  },
  contactItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  contactItemLink: {
    fontSize: 16,
    marginBottom: 8,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  experienceItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  experienceDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 16,
    color: '#333333',
  },
  socialContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginVertical: 10
  },
  socialButton: {
    padding: 10, 
    marginHorizontal: 5, 
    backgroundColor: 'rgba(0,0,0,0.1)', 
    borderRadius: 5
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  languageOption: {
    padding: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
  skillsContainer: {
    padding: 16,
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
});