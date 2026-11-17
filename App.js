
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView
} from 'react-native';

const stories = [
  {
    id: 1,
    emoji: '🦊',
    title: 'Der kleine Fuchs und der Mond',
    category: 'Gute Nacht',
    age: '3–5 Jahre',
    premium: false,
    text: `Tief im Zauberwald lebte ein kleiner Fuchs namens Fino.

Jeden Abend schaute Fino zum Himmel hinauf. Dort leuchtete der Mond wie eine silberne Laterne.

"Eines Tages möchte ich den Mond besuchen", flüsterte Fino.

Eine kleine Eule hörte ihn und sagte: "Du musst nicht zum Mond fliegen. Sein Licht kommt jede Nacht zu dir."

Fino lächelte und kuschelte sich in sein weiches Blätterbett.

"Gute Nacht, lieber Mond", sagte er.

Und während die Sterne funkelten, schlief Fino glücklich ein.`
  },
  {
    id: 2,
    emoji: '🦄',
    title: 'Luna und das Sternenpony',
    category: 'Fantasie',
    age: '3–5 Jahre',
    premium: false,
    text: `Luna entdeckte eines Morgens ein winziges Pony mit einer glitzernden Mähne.

"Ich heiße Sternchen", sagte das Pony. "Ich habe meinen Lieblingsstern verloren."

Gemeinsam liefen sie über eine Wiese voller leuchtender Blumen.

Am Ende des Regenbogens fanden sie einen kleinen Stern, der zwischen zwei Wolken feststeckte.

Luna befreite ihn vorsichtig.

Der Stern funkelte vor Freude.

"Danke, Luna!", rief Sternchen.

Seit diesem Tag besuchte das Sternenpony Luna in ihren schönsten Träumen.`
  },
  {
    id: 3,
    emoji: '🐻',
    title: 'Benni Bär findet einen Freund',
    category: 'Freundschaft',
    age: '3–5 Jahre',
    premium: false,
    text: `Benni war ein kleiner Bär, der gerne Honigkekse backte.

Eines Tages hörte er ein leises Weinen vor seiner Höhle.

Dort saß ein Hase namens Hoppel.

"Ich finde den Weg nach Hause nicht", sagte Hoppel.

Benni nahm seine Pfote und begleitete ihn durch den Wald.

Unterwegs teilten sie Honigkekse und erzählten lustige Geschichten.

Als Hoppel sein Zuhause wiederfand, umarmte er Benni.

"Du bist mein bester Freund!"

Von da an trafen sich die beiden jeden Nachmittag.`
  },
  {
    id: 4,
    emoji: '🌸',
    title: 'Mila und der Zaubergarten',
    category: 'Abenteuer',
    age: '6–8 Jahre',
    premium: false,
    text: `Hinter dem alten Gartenzaun entdeckte Mila eine geheimnisvolle Tür.

Als sie diese öffnete, staunte sie: Blumen sangen Lieder und Schmetterlinge leuchteten in Regenbogenfarben.

Eine sprechende Sonnenblume begrüßte sie.

"Unser Garten braucht Hilfe! Die magische Gießkanne ist verschwunden."

Mila suchte hinter Bäumen, unter Steinen und zwischen riesigen Pilzen.

Schließlich fand sie die Gießkanne bei einem kleinen Igel.

Er hatte damit seine durstigen Blumen versorgt.

Gemeinsam brachten sie die Kanne zurück.

Zum Dank erhielt Mila einen goldenen Samen.

Daraus wuchs zu Hause eine wunderschöne Blume.`
  },
  {
    id: 5,
    emoji: '🐉',
    title: 'Der mutige kleine Drache',
    category: 'Abenteuer',
    age: '6–8 Jahre',
    premium: true,
    text: `Der kleine Drache Flämmchen konnte noch kein Feuer spucken.

Alle anderen Drachen übten jeden Tag, doch bei Flämmchen kamen nur winzige Rauchwolken heraus.

Eines Tages verirrte sich ein Vogelbaby im dunklen Gebirge.

Flämmchen machte sich auf die Suche.

Mit seinem warmen Atem hielt er das Vogelbaby in der kalten Nacht warm.

Am Morgen brachte er es sicher zu seiner Familie.

Da verstand Flämmchen: Mut bedeutet nicht, besonders stark zu sein.

Mut bedeutet, anderen zu helfen.`
  },
  {
    id: 6,
    emoji: '🌈',
    title: 'Die Reise zum Regenbogen',
    category: 'Fantasie',
    age: '6–8 Jahre',
    premium: true,
    text: `Emma entdeckte nach einem Sommerregen einen wunderschönen Regenbogen.

Plötzlich erschien eine kleine Wolkenfee.

"Möchtest du die Farben des Himmels kennenlernen?"

Emma nickte begeistert.

Gemeinsam reisten sie durch rote Erdbeerwolken, orangefarbene Sonnenstrahlen und blaue Sternenmeere.

Jede Farbe erzählte ihre eigene Geschichte.

Am Ende schenkte die Wolkenfee Emma einen winzigen Regenbogenstein.

"Solange du neugierig bleibst, wird deine Welt voller Wunder sein."

Emma bewahrte den Stein für immer auf.`
  }
];

const categories = [
  'Alle',
  'Gute Nacht',
  'Fantasie',
  'Abenteuer',
  'Freundschaft'
];

export default function App() {
  const [page, setPage] = useState('home');
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Alle');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [fontSize, setFontSize] = useState(19);
  const [question, setQuestion] = useState({ a: 7, b: 5 });
  const [answer, setAnswer] = useState('');

  const goHome = () => {
    setSelected(null);
    setPage('home');
  };

  const openStory = (story) => {
    setSelected(story);
    setPage('reader');
  };

  const toggleFavorite = (id) => {
    setFavorites(old =>
      old.includes(id)
        ? old.filter(item => item !== id)
        : [...old, id]
    );
  };

  const openParents = () => {
    setQuestion({
      a: Math.floor(Math.random() * 8) + 5,
      b: Math.floor(Math.random() * 8) + 5
    });
    setAnswer('');
    setPage('gate');
  };

  const checkParent = () => {
    if (
      answer.trim() !== '' &&
      Number(answer) === question.a + question.b
    ) {
      setPage('parents');
    } else {
      Alert.alert(
        'Nicht richtig',
        'Bitte frage einen Erwachsenen.'
      );
    }
  };

  const filtered = stories.filter(story => {
    const matchesSearch = story.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'Alle' ||
      story.category === category;

    const matchesFavorites =
      !onlyFavorites ||
      favorites.includes(story.id);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFavorites
    );
  });

  const Button = ({ title, onPress, light }) => (
    <TouchableOpacity
      style={[
        styles.button,
        light && styles.lightButton
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          light && styles.lightButtonText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {page === 'home' && (
          <>
            <Text style={styles.logo}>
              🌙 TraumWelt
            </Text>

            <Text style={styles.subtitle}>
              Deine magische Geschichtenwelt ✨
            </Text>

            <View style={styles.hero}>
              <Text style={styles.heroEmoji}>
                🦊 🌙 ⭐
              </Text>

              <Text style={styles.heroTitle}>
                Zeit für ein Abenteuer!
              </Text>

              <Text style={styles.heroText}>
                Entdecke zauberhafte Geschichten
                zum Lesen und Träumen.
              </Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="🔍 Geschichte suchen..."
              placeholderTextColor="#A090B3"
              value={search}
              onChangeText={setSearch}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryRow}
            >
              {categories.map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setCategory(item)}
                  style={[
                    styles.chip,
                    category === item &&
                      styles.activeChip
                  ]}
                >
                  <Text
                    style={
                      category === item
                        ? styles.activeChipText
                        : styles.chipText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.favoritesToggle}
              onPress={() =>
                setOnlyFavorites(!onlyFavorites)
              }
            >
              <Text style={styles.favoritesToggleText}>
                {onlyFavorites
                  ? '📚 Alle Geschichten anzeigen'
                  : '❤️ Meine Lieblingsgeschichten'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.heading}>
              {onlyFavorites
                ? '❤️ Meine Favoriten'
                : '📚 Unsere Geschichten'}
            </Text>

            {filtered.length === 0 && (
              <Text style={styles.emptyText}>
                Hier gibt es noch keine Geschichten.
              </Text>
            )}

            {filtered.map(story => (
              <TouchableOpacity
                key={story.id}
                style={styles.storyCard}
                onPress={() => openStory(story)}
                activeOpacity={0.8}
              >
                <Text style={styles.storyEmoji}>
                  {story.emoji}
                </Text>

                <View style={styles.storyInfo}>
                  <Text style={styles.storyTitle}>
                    {story.title}
                  </Text>

                  <Text style={styles.storyMeta}>
                    {story.category} · {story.age}
                  </Text>

                  <Text style={styles.storyLink}>
                    {story.premium
                      ? '👑 Premium-Vorschau'
                      : '📖 Jetzt lesen'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() =>
                    toggleFavorite(story.id)
                  }
                >
                  <Text style={styles.favoriteIcon}>
                    {favorites.includes(story.id)
                      ? '❤️'
                      : '🤍'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            <View style={styles.premiumBox}>
              <Text style={styles.premiumTitle}>
                👑 TraumWelt Premium
              </Text>

              <Text style={styles.premiumText}>
                Bald gibt es noch mehr Geschichten,
                neue Abenteuer und exklusive Inhalte.
              </Text>

              <Button
                title="Mehr erfahren"
                onPress={openParents}
              />
            </View>

            <Button
              title="👨‍👩‍👧 Elternbereich"
              onPress={openParents}
              light
            />
          </>
        )}

        {page === 'reader' && selected && (
          <>
            <Button
              title="← Zurück zu den Geschichten"
              onPress={goHome}
              light
            />

            <View style={styles.readerHeader}>
              <Text style={styles.readerEmoji}>
                {selected.emoji}
              </Text>

              <Text style={styles.readerTitle}>
                {selected.title}
              </Text>

              <Text style={styles.storyMeta}>
                {selected.category} · {selected.age}
              </Text>
            </View>

            {selected.premium && (
              <View style={styles.notice}>
                <Text style={styles.noticeText}>
                  👑 Premium-Vorschau:
                  Diese Geschichte ist in der
                  Testversion kostenlos lesbar.
                </Text>
              </View>
            )}

            <View style={styles.fontBox}>
              <Text style={styles.fontLabel}>
                📖 Schriftgröße einstellen
              </Text>

              <View style={styles.fontButtons}>
                <TouchableOpacity
                  style={styles.fontButton}
                  onPress={() =>
                    setFontSize(Math.max(15, fontSize - 2))
                  }
                >
                  <Text style={styles.fontButtonText}>
                    A−
                  </Text>
                </TouchableOpacity>

                <Text style={styles.fontValue}>
                  {fontSize}
                </Text>

                <TouchableOpacity
                  style={styles.fontButton}
                  onPress={() =>
                    setFontSize(Math.min(30, fontSize + 2))
                  }
                >
                  <Text style={styles.fontButtonText}>
                    A+
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.readingPaper}>
              <Text
                style={[
                  styles.readingText,
                  {
                    fontSize: fontSize,
                    lineHeight: fontSize * 1.7
                  }
                ]}
              >
                {selected.text}
              </Text>
            </View>

            <Button
              title={
                favorites.includes(selected.id)
                  ? '❤️ Aus Favoriten entfernen'
                  : '🤍 Zu Favoriten hinzufügen'
              }
              onPress={() =>
                toggleFavorite(selected.id)
              }
              light
            />

            <Button
              title="📚 Weitere Geschichten"
              onPress={goHome}
            />
          </>
        )}

        {page === 'gate' && (
          <>
            <Button
              title="← Zurück"
              onPress={goHome}
              light
            />

            <View style={styles.parentBox}>
              <Text style={styles.parentEmoji}>
                🔒
              </Text>

              <Text style={styles.heading}>
                Nur für Erwachsene
              </Text>

              <Text style={styles.parentText}>
                Bitte löse diese Aufgabe:
              </Text>

              <Text style={styles.mathText}>
                {question.a} + {question.b} = ?
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ergebnis eingeben"
                keyboardType="number-pad"
                value={answer}
                onChangeText={setAnswer}
              />

              <Button
                title="Weiter"
                onPress={checkParent}
              />
            </View>
          </>
        )}

        {page === 'parents' && (
          <>
            <Button
              title="← Zurück"
              onPress={goHome}
              light
            />

            <Text style={styles.logo}>
              👨‍👩‍👧 Elternbereich
            </Text>

            <View style={styles.parentBox}>
              <Text style={styles.heading}>
                👑 TraumWelt Premium
              </Text>

              <Text style={styles.parentText}>
                Diese Funktionen sind geplant:
              </Text>

              <Text style={styles.feature}>
                ✓ Viele weitere Kindergeschichten
              </Text>

              <Text style={styles.feature}>
                ✓ KI-generierte Hörbücher
              </Text>

              <Text style={styles.feature}>
                ✓ Neue Geschichten regelmäßig
              </Text>

              <Text style={styles.feature}>
                ✓ Werbefreie Nutzung
              </Text>

              <Text style={styles.note}>
                Dies ist eine kostenlose Testversion.
                Es gibt noch keine echten Abos
                oder Zahlungen.
              </Text>
            </View>

            <View style={styles.parentBox}>
              <Text style={styles.heading}>
                ⚙️ Informationen
              </Text>

              <Text style={styles.parentText}>
                Geschichten: {stories.length}
              </Text>

              <Text style={styles.parentText}>
                Favoriten: {favorites.length}
              </Text>

              <Text style={styles.note}>
                Favoriten werden vorerst nur
                während der aktuellen Sitzung
                gespeichert.
              </Text>
            </View>
          </>
        )}

        <Text style={styles.footer}>
          🌙 TraumWelt · Geschichten für Kinder
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FF'
  },
  content: {
    padding: 20,
    paddingBottom: 60
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6941A5',
    textAlign: 'center',
    marginTop: 15
  },
  subtitle: {
    fontSize: 15,
    color: '#8874A3',
    textAlign: 'center',
    marginBottom: 22
  },
  hero: {
    backgroundColor: '#EADFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 22
  },
  heroEmoji: {
    fontSize: 52,
    marginBottom: 12
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#58318D',
    textAlign: 'center'
  },
  heroText: {
    fontSize: 15,
    color: '#705A8B',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 23
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E7DDF5',
    color: '#463955'
  },
  categoryRow: {
    marginBottom: 15
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E6DAF7'
  },
  activeChip: {
    backgroundColor: '#8656C7',
    borderColor: '#8656C7'
  },
  chipText: {
    color: '#74568F',
    fontWeight: '600'
  },
  activeChipText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  favoritesToggle: {
    paddingVertical: 12
  },
  favoritesToggleText: {
    color: '#8656C7',
    fontWeight: 'bold',
    fontSize: 15
  },
  heading: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#58318D',
    marginVertical: 16
  },
  emptyText: {
    color: '#8874A3',
    padding: 20,
    textAlign: 'center'
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE5FA'
  },
  storyEmoji: {
    fontSize: 39,
    marginRight: 12
  },
  storyInfo: {
    flex: 1
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4D3672'
  },
  storyMeta: {
    fontSize: 12,
    color: '#9584AA',
    marginTop: 5
  },
  storyLink: {
    fontSize: 12,
    color: '#8656C7',
    marginTop: 8,
    fontWeight: 'bold'
  },
  favoriteButton: {
    padding: 8
  },
  favoriteIcon: {
    fontSize: 23
  },
  premiumBox: {
    backgroundColor: '#FFF0CF',
    padding: 22,
    borderRadius: 22,
    marginTop: 18,
    marginBottom: 16
  },
  premiumTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#8C5C18'
  },
  premiumText: {
    fontSize: 15,
    color: '#856D45',
    marginVertical: 12,
    lineHeight: 23
  },
  button: {
    backgroundColor: '#8656C7',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 7
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  lightButton: {
    backgroundColor: '#EDE4FA'
  },
  lightButtonText: {
    color: '#6941A5'
  },
  readerHeader: {
    alignItems: 'center',
    padding: 20
  },
  readerEmoji: {
    fontSize: 75
  },
  readerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#58318D',
    textAlign: 'center',
    marginTop: 12
  },
  notice: {
    backgroundColor: '#FFF0CF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12
  },
  noticeText: {
    color: '#805A21',
    lineHeight: 21
  },
  fontBox: {
    backgroundColor: '#EADFFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 18
  },
  fontLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#58318D',
    marginBottom: 12
  },
  fontButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  fontButton: {
    backgroundColor: '#8656C7',
    padding: 13,
    borderRadius: 12,
    minWidth: 65,
    alignItems: 'center'
  },
  fontButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  fontValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#58318D'
  },
  readingPaper: {
    backgroundColor: '#FFFDF7',
    padding: 23,
    borderRadius: 20,
    marginBottom: 18
  },
  readingText: {
    color: '#463955'
  },
  parentBox: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 20,
    marginTop: 20
  },
  parentEmoji: {
    fontSize: 60,
    textAlign: 'center'
  },
  parentText: {
    fontSize: 16,
    color: '#705A8B',
    marginBottom: 12
  },
  mathText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#6941A5',
    textAlign: 'center',
    margin: 20
  },
  feature: {
    fontSize: 16,
    color: '#58318D',
    marginVertical: 8
  },
  note: {
    fontSize: 13,
    color: '#9584AA',
    marginTop: 20,
    lineHeight: 20
  },
  footer: {
    textAlign: 'center',
    color: '#A99BB9',
    marginTop: 35,
    fontSize: 12
  }
});
