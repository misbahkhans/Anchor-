import React, { useState, useEffect } from "react";
import {
  Heart, Wind, BookOpen, Library, Plus, X, Music, Video as VideoIcon,
  Quote as QuoteIcon, Users, ChevronRight, Sparkles, Phone, MessageCircle,
  ExternalLink, Search, Link2, ArrowLeft,
} from "lucide-react";

// ---------- Design tokens ----------
const C = {
  bg: "#0A0A10",
  card: "#15141F",
  cardAlt: "#1E1D2B",
  cardBorder: "#28273A",
  text: "#F5F3F8",
  textDim: "#8D8A9C",
  pink: "#FF7AAE",
  blue: "#6FA3FF",
  pinkSoft: "rgba(255,122,174,0.14)",
  blueSoft: "rgba(111,163,255,0.14)",
};
const GRADIENT = `linear-gradient(135deg, ${C.pink}, ${C.blue})`;

const AFFIRMATIONS = [
  "You're enough, exactly as you are right now.",
  "You don't have to earn rest.",
  "It's okay to not have it figured out yet.",
  "You don't need to depend on anyone else to be okay — you already have what it takes.",
  "This feeling is real, and it's also temporary.",
  "You're allowed to take up space.",
  "One small step today still counts.",
  "You're doing better than you think you are.",
];

const CHECKIN_OPTIONS = [
  { id: "career", label: "Work / career", msg: "Work stuff can sit really heavy, especially when it feels like it never switches off. Feeling behind doesn't mean you are." },
  { id: "relationship", label: "A relationship", msg: "Relationship stuff has a way of replaying in your head on loop. Whatever happened, what you're feeling about it is valid." },
  { id: "money", label: "Money", msg: "Money worries are exhausting because they quietly touch everything else too. Feeling stressed about it doesn't mean you've failed." },
  { id: "study", label: "Studies", msg: "Studies can pile up fast until everything feels urgent at once. One thing at a time still counts as progress." },
  { id: "family", label: "Family", msg: "Family stuff is complicated because you can't just walk away from it. That's genuinely a lot to carry." },
  { id: "everything", label: "Honestly, everything", msg: "Sometimes it's not one thing — it's everything, all at once. That's a lot to hold, and it makes sense you're tired." },
  { id: "unsure", label: "Not sure, just heavy", msg: "You don't have to name it exactly. Sometimes it's just a heavy day, and that's okay too." },
];

const MOODS = [
  { id: "heavy", label: "Heavy / sad", color: C.pink },
  { id: "anxious", label: "Anxious", color: C.blue },
  { id: "numb", label: "Numb", color: "#B79CFF" },
  { id: "angry", label: "Angry", color: "#FF8F6B" },
  { id: "lonely", label: "Lonely", color: "#FF7AAE" },
  { id: "lighter", label: "Want to feel lighter", color: "#6FE3B0" },
];

const CURATED_SONGS = {
  heavy: [["Fix You", "Coldplay"], ["Tum Hi Ho", "Arijit Singh"], ["The Night We Met", "Lord Huron"], ["Someone Like You", "Adele"]],
  anxious: ["Weightless — Marconi Union", "Clair de Lune — Debussy", "Ocean Eyes — Billie Eilish", "Breathe Me — Sia"].map(s => s.split(" — ")),
  numb: [["Numb", "Linkin Park"], ["Skinny Love", "Bon Iver"], ["Say Something", "A Great Big World"]],
  angry: [["Warriors", "Imagine Dragons"], ["Stronger", "Kelly Clarkson"], ["Roar", "Katy Perry"]],
  lonely: [["Kabira", "Arijit Singh"], ["Let Her Go", "Passenger"], ["The Scientist", "Coldplay"]],
  lighter: [["Here Comes the Sun", "The Beatles"], ["Good Days", "SZA"], ["Zinda", "Bhaag Milkha Bhaag"], ["Walking on Sunshine", "Katrina & The Waves"]],
};

// Big browsable library — Bollywood + Hollywood, tagged by genre/vibe
const GENRES = [
  { id: "romantic", label: "Romantic" },
  { id: "sad", label: "Sad / heartbreak" },
  { id: "party", label: "Party" },
  { id: "motivational", label: "Motivational" },
  { id: "trending", label: "Trending on reels" },
  { id: "chill", label: "Chill" },
];
const MUSIC_LIBRARY = [
  { t: "Tum Hi Ho", a: "Arijit Singh", i: "bollywood", g: "romantic" },
  { t: "Raabta", a: "Arijit Singh", i: "bollywood", g: "romantic" },
  { t: "Kesariya", a: "Arijit Singh", i: "bollywood", g: "romantic" },
  { t: "Tera Ban Jaunga", a: "Akhil Sachdeva, Tulsi Kumar", i: "bollywood", g: "romantic" },
  { t: "Channa Mereya", a: "Arijit Singh", i: "bollywood", g: "sad" },
  { t: "Agar Tum Saath Ho", a: "Alka Yagnik, Arijit Singh", i: "bollywood", g: "sad" },
  { t: "Judaai", a: "Arijit Singh", i: "bollywood", g: "sad" },
  { t: "Phir Bhi Tumko Chaahunga", a: "Arijit Singh", i: "bollywood", g: "sad" },
  { t: "Kala Chashma", a: "Amar Arshi, Neha Kakkar", i: "bollywood", g: "party" },
  { t: "London Thumakda", a: "Labh Janjua", i: "bollywood", g: "party" },
  { t: "Badtameez Dil", a: "Benny Dayal", i: "bollywood", g: "party" },
  { t: "Ghungroo", a: "Arijit Singh, Shilpa Rao", i: "bollywood", g: "party" },
  { t: "Zinda", a: "Siddharth Mahadevan", i: "bollywood", g: "motivational" },
  { t: "Chak De India", a: "Sukhwinder Singh", i: "bollywood", g: "motivational" },
  { t: "Kar Har Maidaan Fateh", a: "Sukhwinder Singh, Shankar Mahadevan", i: "bollywood", g: "motivational" },
  { t: "Tauba Tauba", a: "Karan Aujla", i: "bollywood", g: "trending" },
  { t: "Srivalli", a: "Sid Sriram", i: "bollywood", g: "trending" },
  { t: "Pasoori", a: "Ali Sethi, Shae Gill", i: "bollywood", g: "trending" },
  { t: "Jhoome Jo Pathaan", a: "Arijit Singh, Sukriti Kakar", i: "bollywood", g: "trending" },
  { t: "Ilahi", a: "Arijit Singh", i: "bollywood", g: "chill" },
  { t: "Khairiyat", a: "Arijit Singh", i: "bollywood", g: "chill" },
  { t: "Tum Ho", a: "Mohit Chauhan", i: "bollywood", g: "chill" },
  { t: "Perfect", a: "Ed Sheeran", i: "hollywood", g: "romantic" },
  { t: "All of Me", a: "John Legend", i: "hollywood", g: "romantic" },
  { t: "Just the Way You Are", a: "Bruno Mars", i: "hollywood", g: "romantic" },
  { t: "Someone Like You", a: "Adele", i: "hollywood", g: "sad" },
  { t: "Fix You", a: "Coldplay", i: "hollywood", g: "sad" },
  { t: "The Night We Met", a: "Lord Huron", i: "hollywood", g: "sad" },
  { t: "Say Something", a: "A Great Big World", i: "hollywood", g: "sad" },
  { t: "Blinding Lights", a: "The Weeknd", i: "hollywood", g: "party" },
  { t: "Levitating", a: "Dua Lipa", i: "hollywood", g: "party" },
  { t: "Uptown Funk", a: "Bruno Mars", i: "hollywood", g: "party" },
  { t: "Shake It Off", a: "Taylor Swift", i: "hollywood", g: "party" },
  { t: "Stronger", a: "Kelly Clarkson", i: "hollywood", g: "motivational" },
  { t: "Roar", a: "Katy Perry", i: "hollywood", g: "motivational" },
  { t: "Eye of the Tiger", a: "Survivor", i: "hollywood", g: "motivational" },
  { t: "Unstoppable", a: "Sia", i: "hollywood", g: "motivational" },
  { t: "Espresso", a: "Sabrina Carpenter", i: "hollywood", g: "trending" },
  { t: "Good Luck, Babe!", a: "Chappell Roan", i: "hollywood", g: "trending" },
  { t: "Flowers", a: "Miley Cyrus", i: "hollywood", g: "trending" },
  { t: "Cruel Summer", a: "Taylor Swift", i: "hollywood", g: "trending" },
  { t: "Here Comes the Sun", a: "The Beatles", i: "hollywood", g: "chill" },
  { t: "Banana Pancakes", a: "Jack Johnson", i: "hollywood", g: "chill" },
  { t: "Landslide", a: "Fleetwood Mac", i: "hollywood", g: "chill" },
];
function ytSearch(song) { return `https://www.youtube.com/results?search_query=${encodeURIComponent(song.t + " " + song.a)}`; }
function spotifySearch(song) { return `https://open.spotify.com/search/${encodeURIComponent(song.t + " " + song.a)}`; }
function igSearch(song) { return `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(song.t)}`; }

const SEED_QUOTES = [
  { id: 1, text: "This too shall pass.", author: "Persian proverb", tag: "when it feels heavy" },
  { id: 2, text: "You don't have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr.", tag: "when I'm stuck" },
];
const SEED_CONTACTS = [
  { id: 1, name: "Add someone you trust", relation: "tap the + to add a real contact", phone: "", template: "" },
];

// ---------- link parsing ----------
function getSpotifyEmbed(url) {
  if (!url) return null;
  const m = url.trim().match(/open\.spotify\.com\/(?:intl-[a-zA-Z-]+\/)?(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}` : null;
}
function getYouTubeEmbed(url) {
  if (!url) return null;
  const cleaned = url.trim();
  const patterns = [
    /youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = cleaned.match(p);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
  }
  return null;
}
function getYouTubeId(url) {
  const embed = getYouTubeEmbed(url);
  return embed ? embed.split("/embed/")[1] : null;
}

// ---------- shared bits ----------
function Screen({ children }) {
  return <div style={{ padding: "18px 18px 110px" }}>{children}</div>;
}
function SectionTitle({ eyebrow, title, sub }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {eyebrow && (
        <div style={{ fontSize: 11.5, letterSpacing: 1.8, textTransform: "uppercase", color: C.pink, fontFamily: "Inter, sans-serif", fontWeight: 600, marginBottom: 6 }}>
          {eyebrow}
        </div>
      )}
      <div style={{ fontFamily: "Sora, sans-serif", fontSize: 24, color: C.text, fontWeight: 600 }}>{title}</div>
      {sub && <div style={{ color: C.textDim, fontSize: 13.5, fontFamily: "Inter, sans-serif", marginTop: 6, lineHeight: 1.5 }}>{sub}</div>}
    </div>
  );
}
function Card({ children, style }) {
  return <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: 16, ...style }}>{children}</div>;
}
function Chip({ active, onClick, children, color }) {
  return (
    <button onClick={onClick} style={{
      background: active ? (color || C.pink) : C.cardAlt, color: active ? "#0A0A10" : C.textDim,
      border: `1px solid ${active ? "transparent" : C.cardBorder}`, borderRadius: 20, padding: "8px 14px",
      fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0,
    }}>{children}</button>
  );
}
function PrimaryButton({ children, onClick, disabled, style }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", background: disabled ? C.cardAlt : GRADIENT, border: "none",
      color: disabled ? C.textDim : "#0A0A10", borderRadius: 12, padding: "12px 0",
      fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14.5, cursor: disabled ? "default" : "pointer", ...style,
    }}>{children}</button>
  );
}

// ---------- Affirmation toast ----------
function AffirmationToast({ text, onClose }) {
  if (!text) return null;
  return (
    <div style={{
      position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 60,
      width: "calc(100% - 32px)", maxWidth: 388, animation: "slideDown 0.4s ease",
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${C.pinkSoft}, ${C.blueSoft})`, backdropFilter: "blur(14px)",
        border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: "14px 16px",
        display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
      }}>
        <Heart size={16} color={C.pink} fill={C.pink} style={{ flexShrink: 0 }} />
        <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontSize: 13.5, flex: 1, lineHeight: 1.4 }}>{text}</div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: C.textDim, cursor: "pointer", flexShrink: 0 }}><X size={15} /></button>
      </div>
      <style>{`@keyframes slideDown { from { opacity: 0; transform: translate(-50%, -12px); } to { opacity: 1; transform: translate(-50%, 0); } }`}</style>
    </div>
  );
}

// ---------- Check-in modal ("what's going on") ----------
function CheckInModal({ onClose, goTab }) {
  const [picked, setPicked] = useState(null);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,6,10,0.85)", zIndex: 55, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: 24, maxWidth: 380, width: "100%", maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ fontFamily: "Sora, sans-serif", fontSize: 19, color: C.text, fontWeight: 600 }}>
            {picked ? "That makes sense" : "Want to tell me what's going on?"}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textDim, cursor: "pointer" }}><X size={19} /></button>
        </div>

        {!picked ? (
          <>
            <div style={{ color: C.textDim, fontSize: 13.5, fontFamily: "Inter, sans-serif", marginBottom: 16 }}>
              No pressure to explain everything — just pick whatever feels closest.
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CHECKIN_OPTIONS.map(o => (
                <Chip key={o.id} active={false} onClick={() => setPicked(o)}>{o.label}</Chip>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontSize: 14.5, lineHeight: 1.6, marginBottom: 20 }}>
              {picked.msg}
            </div>
            <div style={{ color: C.textDim, fontSize: 12, fontFamily: "Inter, sans-serif", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
              What might help right now
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => { goTab("reframe"); onClose(); }} style={navRowStyle}>
                <span>Work through the thought</span><ChevronRight size={16} color={C.textDim} />
              </button>
              <button onClick={() => { goTab("songs"); onClose(); }} style={navRowStyle}>
                <span>Play something that fits this mood</span><ChevronRight size={16} color={C.textDim} />
              </button>
              <button onClick={() => { goTab("library"); onClose(); }} style={navRowStyle}>
                <span>Reach out to someone</span><ChevronRight size={16} color={C.textDim} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
const navRowStyle = {
  display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%",
  background: C.cardAlt, border: "none", borderRadius: 10, padding: "12px 14px",
  color: C.text, fontFamily: "Inter, sans-serif", fontSize: 13.5, cursor: "pointer", textAlign: "left",
};

// ---------- Breathing ----------
function Breathing() {
  const [running, setRunning] = useState(false);
  return (
    <Card style={{ textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: C.blue, marginBottom: 10 }}>
        <Wind size={17} /><span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, letterSpacing: 1, fontWeight: 600 }}>GROUNDING</span>
      </div>
      <div style={{ width: 92, height: 92, borderRadius: "50%", margin: "8px auto", background: GRADIENT, animation: running ? "boxbreathe 8s ease-in-out infinite" : "none", opacity: 0.9 }} />
      <style>{`@keyframes boxbreathe { 0%{transform:scale(.72)} 25%{transform:scale(1.15)} 50%{transform:scale(1.15)} 75%{transform:scale(.72)} 100%{transform:scale(.72)} }`}</style>
      <div style={{ color: C.textDim, fontSize: 13, fontFamily: "Inter, sans-serif", margin: "10px 0 16px" }}>
        {running ? "In as it grows, hold, out as it shrinks." : "Box breathing — 4 seconds in, hold, 4 out."}
      </div>
      <button onClick={() => setRunning(!running)} style={{
        background: running ? "transparent" : GRADIENT, border: running ? `1px solid ${C.cardBorder}` : "none",
        color: running ? C.text : "#0A0A10", borderRadius: 10, padding: "9px 22px", fontFamily: "Inter, sans-serif", fontWeight: 700, cursor: "pointer",
      }}>{running ? "Stop" : "Start breathing"}</button>
    </Card>
  );
}

// ---------- Home ----------
function Home({ goTab, setAffirmation }) {
  const [checkIn, setCheckIn] = useState(false);
  return (
    <Screen>
      <SectionTitle eyebrow="Welcome back" title="How are you feeling right now?" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0 4px" }}>
        <button onClick={() => setCheckIn(true)} style={{
          width: 168, height: 168, borderRadius: "50%", border: "none", background: GRADIENT,
          color: "#0A0A10", fontFamily: "Sora, sans-serif", fontSize: 17, fontWeight: 700,
          cursor: "pointer", boxShadow: "0 0 50px rgba(255,122,174,0.25)", animation: "breathe 4.5s ease-in-out infinite",
        }}>right now,<br />I need this</button>
        <style>{`@keyframes breathe {0%,100%{transform:scale(1)} 50%{transform:scale(1.05)}} @media (prefers-reduced-motion: reduce){button{animation:none!important}}`}</style>
        <div style={{ color: C.textDim, fontSize: 12.5, marginTop: 14, fontFamily: "Inter, sans-serif", textAlign: "center", maxWidth: 230 }}>
          Tap when things feel like too much.
        </div>
      </div>

      <div style={{ marginTop: 22 }}><Breathing /></div>

      <div style={{ marginTop: 14 }}>
        <Card>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.textDim, marginBottom: 10 }}>Something on your mind?</div>
          <button onClick={() => setCheckIn(true)} style={{
            width: "100%", background: "transparent", border: `1px solid ${C.blue}`, color: C.blue,
            borderRadius: 10, padding: "10px 0", fontFamily: "Inter, sans-serif", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer",
          }}>Tell me what's going on <ChevronRight size={16} /></button>
        </Card>
      </div>

      <div style={{ marginTop: 14 }}>
        <Card style={{ background: "transparent", border: `1px solid ${C.cardBorder}` }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.textDim, lineHeight: 1.6 }}>
            If things feel like an emergency, you deserve real support right now. In the US, call or text{" "}
            <strong style={{ color: C.text }}>988</strong> (Suicide & Crisis Lifeline), free, anytime. Elsewhere, search "crisis line" + your country.
          </div>
        </Card>
      </div>

      {checkIn && <CheckInModal onClose={() => setCheckIn(false)} goTab={goTab} />}
    </Screen>
  );
}

// ---------- Reframe ----------
const DISTORTIONS = [
  { id: "cat", label: "Catastrophizing", hint: "Assuming the worst possible outcome will happen." },
  { id: "mind", label: "Mind-reading", hint: "Assuming you know what others think of you." },
  { id: "all", label: "All-or-nothing", hint: "Totally good or totally bad, no in-between." },
  { id: "should", label: "Should statements", hint: "Rigid rules about how you or others must be." },
  { id: "pers", label: "Personalizing", hint: "Blaming yourself for things outside your control." },
  { id: "over", label: "Overgeneralizing", hint: "One bad moment means it's always this way." },
];
function Reframe() {
  const [step, setStep] = useState(0);
  const [thought, setThought] = useState("");
  const [distortion, setDistortion] = useState(null);
  const [reframe, setReframe] = useState("");
  const [saved, setSaved] = useState([]);
  const reset = () => { setStep(0); setThought(""); setDistortion(null); setReframe(""); };
  const finish = () => { setSaved([{ thought, distortion, reframe }, ...saved]); reset(); };
  const inputStyle = { width: "100%", background: C.cardAlt, border: `1px solid ${C.cardBorder}`, borderRadius: 10, color: C.text, padding: 12, fontFamily: "Inter, sans-serif", fontSize: 14, resize: "vertical", boxSizing: "border-box" };
  return (
    <Screen>
      <SectionTitle eyebrow="Thought reframer" title="Let's slow this thought down" />
      <Card>
        {step === 0 && (
          <div>
            <div style={{ color: C.textDim, fontSize: 14, fontFamily: "Inter, sans-serif", marginBottom: 10 }}>What's the thought that's been looping?</div>
            <textarea value={thought} onChange={e => setThought(e.target.value)} placeholder="e.g. Everyone thinks I'm behind and they're right" style={{ ...inputStyle, minHeight: 90 }} />
            <div style={{ marginTop: 14 }}><PrimaryButton disabled={!thought.trim()} onClick={() => setStep(1)}>Continue</PrimaryButton></div>
          </div>
        )}
        {step === 1 && (
          <div>
            <div style={{ color: C.textDim, fontSize: 14, fontFamily: "Inter, sans-serif", marginBottom: 12 }}>Does this thought have a pattern? Pick the closest one.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {DISTORTIONS.map(d => (
                <button key={d.id} onClick={() => { setDistortion(d); setStep(2); }} style={{ textAlign: "left", background: C.cardAlt, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 12, cursor: "pointer" }}>
                  <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14 }}>{d.label}</div>
                  <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 12.5, marginTop: 2 }}>{d.hint}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div style={{ background: C.cardAlt, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
              <div style={{ color: C.textDim, fontSize: 12, fontFamily: "Inter, sans-serif", marginBottom: 4 }}>Original thought</div>
              <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontSize: 14 }}>{thought}</div>
              <div style={{ color: C.blue, fontSize: 12, fontFamily: "Inter, sans-serif", marginTop: 8 }}>Pattern: {distortion.label}</div>
            </div>
            <div style={{ color: C.textDim, fontSize: 14, fontFamily: "Inter, sans-serif", marginBottom: 10 }}>If a close friend had this exact thought, what would you gently say back?</div>
            <textarea value={reframe} onChange={e => setReframe(e.target.value)} placeholder="A more balanced way to see it..." style={{ ...inputStyle, minHeight: 80 }} />
            <div style={{ marginTop: 14 }}><PrimaryButton disabled={!reframe.trim()} onClick={finish}>Save & finish</PrimaryButton></div>
          </div>
        )}
      </Card>
      {saved.length > 0 && (
        <div style={{ marginTop: 22 }}>
          <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 11.5, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>Past reframes</div>
          {saved.map((s, i) => (
            <Card key={i} style={{ marginBottom: 10, background: C.cardAlt }}>
              <div style={{ color: C.textDim, fontSize: 12.5, fontFamily: "Inter, sans-serif", marginBottom: 6 }}>{s.distortion.label}</div>
              <div style={{ color: C.text, fontSize: 13.5, fontFamily: "Inter, sans-serif", opacity: 0.6, marginBottom: 6, textDecoration: "line-through" }}>{s.thought}</div>
              <div style={{ color: C.blue, fontSize: 14, fontFamily: "Inter, sans-serif" }}>{s.reframe}</div>
            </Card>
          ))}
        </div>
      )}
    </Screen>
  );
}

// ---------- Mood ----------
function Mood() {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);
  const labels = ["Rough", "Low", "Okay", "Good", "Great"];
  const colors = [C.pink, "#E88FA8", "#B79CFF", C.blue, "#6FE3B0"];
  const log = () => { if (selected === null) return; setEntries([{ value: selected }, ...entries].slice(0, 14)); setSelected(null); };
  return (
    <Screen>
      <SectionTitle eyebrow="Check-in" title="How's today, really?" />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
          {labels.map((label, i) => (
            <button key={label} onClick={() => setSelected(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: selected === i ? C.cardAlt : "transparent", border: "none", borderRadius: 10, padding: "10px 2px", cursor: "pointer" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: colors[i], opacity: selected === i ? 1 : 0.5 }} />
              <span style={{ fontSize: 10.5, color: C.textDim, fontFamily: "Inter, sans-serif" }}>{label}</span>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 16 }}><PrimaryButton disabled={selected === null} onClick={log}>Log today</PrimaryButton></div>
      </Card>
      {entries.length > 0 && (
        <div style={{ marginTop: 22 }}>
          <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 11.5, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>Last {entries.length} check-ins</div>
          <Card>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90 }}>
              {[...entries].reverse().map((e, i) => (<div key={i} title={labels[e.value]} style={{ flex: 1, height: `${(e.value + 1) / 5 * 100}%`, background: colors[e.value], borderRadius: 4, minHeight: 8 }} />))}
            </div>
          </Card>
        </div>
      )}
    </Screen>
  );
}

// ---------- Songs (Mood DJ) ----------
function Songs() {
  const [mood, setMood] = useState(null);
  const [myTracks, setMyTracks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ url: "", label: "", mood: "heavy" });

  const addTrack = () => {
    if (!form.url.trim()) return;
    const spotify = getSpotifyEmbed(form.url);
    const youtube = getYouTubeEmbed(form.url);
    setMyTracks([{ id: Date.now(), ...form, spotify, youtube }, ...myTracks]);
    setForm({ url: "", label: "", mood: "heavy" });
    setAdding(false);
  };

  const moodMatches = mood ? myTracks.filter(t => t.mood === mood.id) : [];

  return (
    <Screen>
      <SectionTitle eyebrow="Mood DJ" title="Tell me how you're feeling" sub="I'll match something to it — your own saved tracks first, then a few suggestions." />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {MOODS.map(m => <Chip key={m.id} active={mood?.id === m.id} color={m.color} onClick={() => setMood(m)}>{m.label}</Chip>)}
      </div>

      {mood && (
        <div style={{ marginBottom: 22 }}>
          {moodMatches.length > 0 && (
            <>
              <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 11.5, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>From your library</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
                {moodMatches.map(t => <TrackCard key={t.id} track={t} />)}
              </div>
            </>
          )}
          <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 11.5, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>A few that might fit</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CURATED_SONGS[mood.id].map(([title, artist], i) => (
              <a key={i} href={`https://www.youtube.com/results?search_query=${encodeURIComponent(title + " " + artist)}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", background: C.cardAlt, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: "12px 14px" }}>
                <div>
                  <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600 }}>{title}</div>
                  <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 12.5 }}>{artist}</div>
                </div>
                <Search size={16} color={C.textDim} />
              </a>
            ))}
          </div>
        </div>
      )}

      <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 18 }}>
        <div style={{ color: C.text, fontFamily: "Sora, sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Your saved tracks</div>
        {!adding ? (
          <button onClick={() => setAdding(true)} style={{ width: "100%", background: "transparent", border: `1px dashed ${C.cardBorder}`, color: C.textDim, borderRadius: 12, padding: "12px 0", fontFamily: "Inter, sans-serif", marginBottom: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Plus size={16} /> Add a Spotify or YouTube link
          </button>
        ) : (
          <Card style={{ marginBottom: 14 }}>
            <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="Paste Spotify or YouTube link"
              style={{ width: "100%", background: C.cardAlt, border: `1px solid ${C.cardBorder}`, borderRadius: 8, color: C.text, padding: 10, fontFamily: "Inter, sans-serif", fontSize: 13.5, marginBottom: 8, boxSizing: "border-box" }} />
            <input value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} placeholder="Playlist or song name (optional)"
              style={{ width: "100%", background: C.cardAlt, border: `1px solid ${C.cardBorder}`, borderRadius: 8, color: C.text, padding: 10, fontFamily: "Inter, sans-serif", fontSize: 13.5, marginBottom: 10, boxSizing: "border-box" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {MOODS.map(m => <Chip key={m.id} active={form.mood === m.id} color={m.color} onClick={() => setForm({ ...form, mood: m.id })}>{m.label}</Chip>)}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setAdding(false)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.cardBorder}`, color: C.textDim, borderRadius: 8, padding: "9px 0", fontFamily: "Inter, sans-serif", cursor: "pointer" }}>Cancel</button>
              <div style={{ flex: 1 }}><PrimaryButton onClick={addTrack}>Save</PrimaryButton></div>
            </div>
          </Card>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {myTracks.filter(t => !mood || t.mood !== mood.id).map(t => <TrackCard key={t.id} track={t} />)}
        </div>
      </div>

      <MusicLibraryBrowser />
    </Screen>
  );
}

function MusicLibraryBrowser() {
  const [industry, setIndustry] = useState("all");
  const [genre, setGenre] = useState("all");
  const [query, setQuery] = useState("");
  const [helper, setHelper] = useState(null); // null | "industry" | "genre"

  const pickIndustry = (val) => {
    const chosen = val === "surprise" ? (Math.random() < 0.5 ? "bollywood" : "hollywood") : val;
    setIndustry(chosen);
    setHelper("genre");
  };
  const pickGenre = (val) => {
    const chosen = val === "surprise" ? GENRES[Math.floor(Math.random() * GENRES.length)].id : val;
    setGenre(chosen);
    setHelper(null);
  };

  const results = MUSIC_LIBRARY.filter(s =>
    (industry === "all" || s.i === industry) &&
    (genre === "all" || s.g === genre) &&
    (query.trim() === "" || (s.t + " " + s.a).toLowerCase().includes(query.trim().toLowerCase()))
  );

  return (
    <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 22, marginTop: 22 }}>
      <div style={{ color: C.text, fontFamily: "Sora, sans-serif", fontSize: 17, fontWeight: 600, marginBottom: 4 }}>Music library</div>
      <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 13, marginBottom: 14 }}>
        Bollywood, Hollywood, and what's trending on reels right now. Tap a song to play it wherever you like.
      </div>

      {helper === null && (
        <button onClick={() => setHelper("industry")} style={{
          width: "100%", background: `linear-gradient(135deg, ${C.pinkSoft}, ${C.blueSoft})`, border: `1px solid ${C.cardBorder}`,
          color: C.text, borderRadius: 12, padding: "12px 14px", fontFamily: "Inter, sans-serif", fontSize: 13.5, fontWeight: 600,
          marginBottom: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <Sparkles size={15} color={C.pink} /> Not sure what to pick? I'll help — just tell me Bolly or Holly
        </button>
      )}

      {helper === "industry" && (
        <Card style={{ marginBottom: 16 }}>
          <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontSize: 14, marginBottom: 12 }}>Bollywood or Hollywood today?</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Chip active={false} color={C.pink} onClick={() => pickIndustry("bollywood")}>Bollywood</Chip>
            <Chip active={false} color={C.blue} onClick={() => pickIndustry("hollywood")}>Hollywood</Chip>
            <Chip active={false} onClick={() => pickIndustry("surprise")}>Surprise me</Chip>
          </div>
        </Card>
      )}
      {helper === "genre" && (
        <Card style={{ marginBottom: 16 }}>
          <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontSize: 14, marginBottom: 12 }}>What kind of mood?</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {GENRES.map(g => <Chip key={g.id} active={false} onClick={() => pickGenre(g.id)}>{g.label}</Chip>)}
            <Chip active={false} onClick={() => pickGenre("surprise")}>Surprise me</Chip>
          </div>
        </Card>
      )}

      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a song or artist"
        style={{ width: "100%", background: C.cardAlt, border: `1px solid ${C.cardBorder}`, borderRadius: 10, color: C.text, padding: 11, fontFamily: "Inter, sans-serif", fontSize: 13.5, marginBottom: 12, boxSizing: "border-box" }} />

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <Chip active={industry === "all"} onClick={() => setIndustry("all")}>All</Chip>
        <Chip active={industry === "bollywood"} color={C.pink} onClick={() => setIndustry("bollywood")}>Bollywood</Chip>
        <Chip active={industry === "hollywood"} color={C.blue} onClick={() => setIndustry("hollywood")}>Hollywood</Chip>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <Chip active={genre === "all"} onClick={() => setGenre("all")}>All genres</Chip>
        {GENRES.map(g => <Chip key={g.id} active={genre === g.id} onClick={() => setGenre(g.id)}>{g.label}</Chip>)}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {results.length === 0 && <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 13.5, textAlign: "center", padding: "16px 0" }}>Nothing matches that yet — try a different filter.</div>}
        {results.map((s, i) => <SongLibraryCard key={i} song={s} />)}
      </div>
    </div>
  );
}
function TrackCard({ track }) {
  const platform = track.spotify ? "Spotify" : track.youtube ? "YouTube" : "Link";
  const color = track.spotify ? "#3FE087" : C.pink;
  const ytId = track.youtube ? track.youtube.split("/embed/")[1] : null;
  return (
    <a href={track.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <Card style={{ background: C.cardAlt, padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
        {ytId ? (
          <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt="" onError={e => { e.target.style.display = "none"; }}
            style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover", flexShrink: 0, background: C.card }} />
        ) : (
          <div style={{ width: 44, height: 44, borderRadius: 10, background: `linear-gradient(135deg, ${color}44, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Music size={18} color={color} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: color, fontSize: 10.5, textTransform: "uppercase", letterSpacing: 1, fontFamily: "Inter, sans-serif", fontWeight: 700, marginBottom: 2 }}>{platform}</div>
          <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{track.label || "Tap to play"}</div>
        </div>
        <ExternalLink size={16} color={C.textDim} style={{ flexShrink: 0 }} />
      </Card>
    </a>
  );
}

function SongLibraryCard({ song }) {
  return (
    <Card style={{ background: C.cardAlt, padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: song.i === "bollywood" ? "linear-gradient(135deg, #FF7AAE44, transparent)" : "linear-gradient(135deg, #6FA3FF44, transparent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Music size={16} color={song.i === "bollywood" ? C.pink : C.blue} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{song.t}</div>
        <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 12 }}>{song.a}</div>
      </div>
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        <a href={ytSearch(song)} target="_blank" rel="noopener noreferrer" style={miniIconStyle} aria-label="Open on YouTube"><VideoIcon size={14} color="#FF4D4D" /></a>
        <a href={spotifySearch(song)} target="_blank" rel="noopener noreferrer" style={miniIconStyle} aria-label="Open on Spotify"><Music size={14} color="#3FE087" /></a>
        <a href={igSearch(song)} target="_blank" rel="noopener noreferrer" style={miniIconStyle} aria-label="Search on Instagram"><Sparkles size={14} color={C.pink} /></a>
      </div>
    </Card>
  );
}
const miniIconStyle = { width: 30, height: 30, borderRadius: "50%", background: C.card, border: `1px solid ${C.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" };

// ---------- Library (quotes, videos, contacts) ----------
function LibraryView() {
  const [tab, setTab] = useState("contacts");
  const [quotes, setQuotes] = useState(SEED_QUOTES);
  const [videos, setVideos] = useState([]);
  const [contacts, setContacts] = useState(SEED_CONTACTS);
  const [adding, setAdding] = useState(false);

  const [qForm, setQForm] = useState({ text: "", author: "", tag: "" });
  const [vForm, setVForm] = useState({ url: "", label: "" });
  const [cForm, setCForm] = useState({ name: "", relation: "", phone: "", template: "" });

  const tabs = [{ id: "contacts", label: "People", icon: Users }, { id: "quotes", label: "Quotes", icon: QuoteIcon }, { id: "videos", label: "Videos", icon: VideoIcon }];

  const inputStyle = { width: "100%", background: C.cardAlt, border: `1px solid ${C.cardBorder}`, borderRadius: 8, color: C.text, padding: 10, fontFamily: "Inter, sans-serif", fontSize: 13.5, marginBottom: 8, boxSizing: "border-box" };

  return (
    <Screen>
      <SectionTitle eyebrow="Your library" title="Things — and people — that help" />
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => { setTab(t.id); setAdding(false); }} style={{
              flex: 1, background: tab === t.id ? C.cardAlt : "transparent", border: `1px solid ${tab === t.id ? C.cardBorder : "transparent"}`,
              borderRadius: 10, padding: "10px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer",
            }}>
              <Icon size={16} color={tab === t.id ? C.pink : C.textDim} />
              <span style={{ fontSize: 11.5, color: tab === t.id ? C.text : C.textDim, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{t.label}</span>
            </button>
          );
        })}
      </div>

      {!adding ? (
        <button onClick={() => setAdding(true)} style={{ width: "100%", background: "transparent", border: `1px dashed ${C.cardBorder}`, color: C.textDim, borderRadius: 12, padding: "12px 0", fontFamily: "Inter, sans-serif", marginBottom: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Plus size={16} /> {tab === "contacts" ? "Add a contact" : tab === "quotes" ? "Add a quote" : "Add a video link"}
        </button>
      ) : (
        <Card style={{ marginBottom: 16 }}>
          {tab === "contacts" && (
            <>
              <input value={cForm.name} onChange={e => setCForm({ ...cForm, name: e.target.value })} placeholder="Name" style={inputStyle} />
              <input value={cForm.relation} onChange={e => setCForm({ ...cForm, relation: e.target.value })} placeholder="How you know them (optional)" style={inputStyle} />
              <input value={cForm.phone} onChange={e => setCForm({ ...cForm, phone: e.target.value })} placeholder="Phone number (optional)" style={inputStyle} />
              <input value={cForm.template} onChange={e => setCForm({ ...cForm, template: e.target.value })} placeholder="Quick message to send (optional)" style={inputStyle} />
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button onClick={() => setAdding(false)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.cardBorder}`, color: C.textDim, borderRadius: 8, padding: "9px 0", fontFamily: "Inter, sans-serif", cursor: "pointer" }}>Cancel</button>
                <div style={{ flex: 1 }}><PrimaryButton disabled={!cForm.name.trim()} onClick={() => { setContacts([{ id: Date.now(), ...cForm }, ...contacts]); setCForm({ name: "", relation: "", phone: "", template: "" }); setAdding(false); }}>Save</PrimaryButton></div>
              </div>
            </>
          )}
          {tab === "quotes" && (
            <>
              <textarea value={qForm.text} onChange={e => setQForm({ ...qForm, text: e.target.value })} placeholder="The quote" style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} />
              <input value={qForm.author} onChange={e => setQForm({ ...qForm, author: e.target.value })} placeholder="Who said it (optional)" style={inputStyle} />
              <input value={qForm.tag} onChange={e => setQForm({ ...qForm, tag: e.target.value })} placeholder="When does this help?" style={inputStyle} />
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button onClick={() => setAdding(false)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.cardBorder}`, color: C.textDim, borderRadius: 8, padding: "9px 0", fontFamily: "Inter, sans-serif", cursor: "pointer" }}>Cancel</button>
                <div style={{ flex: 1 }}><PrimaryButton disabled={!qForm.text.trim()} onClick={() => { setQuotes([{ id: Date.now(), ...qForm }, ...quotes]); setQForm({ text: "", author: "", tag: "" }); setAdding(false); }}>Save</PrimaryButton></div>
              </div>
            </>
          )}
          {tab === "videos" && (
            <>
              <input value={vForm.url} onChange={e => setVForm({ ...vForm, url: e.target.value })} placeholder="Paste YouTube link" style={inputStyle} />
              <input value={vForm.label} onChange={e => setVForm({ ...vForm, label: e.target.value })} placeholder="What it is (optional)" style={inputStyle} />
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button onClick={() => setAdding(false)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.cardBorder}`, color: C.textDim, borderRadius: 8, padding: "9px 0", fontFamily: "Inter, sans-serif", cursor: "pointer" }}>Cancel</button>
                <div style={{ flex: 1 }}><PrimaryButton disabled={!vForm.url.trim()} onClick={() => { setVideos([{ id: Date.now(), ...vForm, embed: getYouTubeEmbed(vForm.url) }, ...videos]); setVForm({ url: "", label: "" }); setAdding(false); }}>Save</PrimaryButton></div>
              </div>
            </>
          )}
        </Card>
      )}

      {tab === "contacts" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {contacts.map(c => (
            <Card key={c.id} style={{ background: C.cardAlt, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: GRADIENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#0A0A10", fontFamily: "Sora, sans-serif", fontWeight: 700 }}>
                {c.name.trim().charAt(0).toUpperCase() || "?"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontSize: 14.5, fontWeight: 600 }}>{c.name}</div>
                {c.relation && <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 12 }}>{c.relation}</div>}
              </div>
              {c.phone && (
                <div style={{ display: "flex", gap: 8 }}>
                  <a href={`sms:${c.phone}${c.template ? `?body=${encodeURIComponent(c.template)}` : ""}`} style={iconBtnStyle}><MessageCircle size={16} color={C.blue} /></a>
                  <a href={`tel:${c.phone}`} style={iconBtnStyle}><Phone size={16} color={C.pink} /></a>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {tab === "quotes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {quotes.map(q => (
            <Card key={q.id} style={{ background: C.cardAlt }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, color: C.pink, marginBottom: 8 }}>
                <QuoteIcon size={14} /><span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Quote</span>
                {q.tag && <span style={{ marginLeft: "auto", fontSize: 11.5, color: C.textDim, fontFamily: "Inter, sans-serif" }}>{q.tag}</span>}
              </div>
              <div style={{ color: C.text, fontFamily: "Sora, sans-serif", fontSize: 15.5 }}>{q.text}</div>
              {q.author && <div style={{ color: C.textDim, fontSize: 12.5, fontFamily: "Inter, sans-serif", marginTop: 4 }}>{q.author}</div>}
            </Card>
          ))}
        </div>
      )}

      {tab === "videos" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {videos.length === 0 && <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 13.5, textAlign: "center", padding: "20px 0" }}>No videos saved yet.</div>}
          {videos.map(v => {
            const ytId = v.embed ? v.embed.split("/embed/")[1] : null;
            return (
            <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
              <Card style={{ background: C.cardAlt, padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
                {ytId ? (
                  <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt="" onError={e => { e.target.style.display = "none"; }}
                    style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover", flexShrink: 0, background: C.card }} />
                ) : (
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: `${C.pinkSoft}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <VideoIcon size={18} color={C.pink} />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: C.text, fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.label || "Tap to watch"}</div>
                  <div style={{ color: C.textDim, fontFamily: "Inter, sans-serif", fontSize: 12 }}>Opens in YouTube</div>
                </div>
                <ExternalLink size={16} color={C.textDim} style={{ flexShrink: 0 }} />
              </Card>
            </a>
          );})}
        </div>
      )}
    </Screen>
  );
}
const iconBtnStyle = { width: 34, height: 34, borderRadius: "50%", background: C.card, border: `1px solid ${C.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" };

// ---------- App shell ----------
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [affirmation, setAffirmation] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);
      setTimeout(() => setAffirmation(null), 6000);
    }, 70000);
    return () => clearInterval(interval);
  }, []);

  const manualAffirmation = () => {
    setAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);
    setTimeout(() => setAffirmation(null), 6000);
  };

  const tabs = [
    { id: "home", label: "Home", icon: Heart },
    { id: "songs", label: "Songs", icon: Music },
    { id: "reframe", label: "Reframe", icon: Sparkles },
    { id: "mood", label: "Mood", icon: BookOpen },
    { id: "library", label: "Library", icon: Library },
  ];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 420, margin: "0 auto", position: "relative", boxShadow: "0 0 60px rgba(0,0,0,0.5)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #56536B; }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 4px" }}>
        <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 16, color: C.text, letterSpacing: 0.3 }}>Anchor</div>
        <button onClick={manualAffirmation} aria-label="Send me a reminder" style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Heart size={15} color={C.pink} />
        </button>
      </div>

      {activeTab === "home" && <Home goTab={setActiveTab} setAffirmation={setAffirmation} />}
      {activeTab === "songs" && <Songs />}
      {activeTab === "reframe" && <Reframe />}
      {activeTab === "mood" && <Mood />}
      {activeTab === "library" && <LibraryView />}

      <AffirmationToast text={affirmation} onClose={() => setAffirmation(null)} />

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: "rgba(10,10,16,0.95)", backdropFilter: "blur(10px)", borderTop: `1px solid ${C.cardBorder}`, display: "flex", padding: "10px 4px calc(10px + env(safe-area-inset-bottom))" }}>
        {tabs.map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 0", cursor: "pointer", color: active ? C.pink : C.textDim }}>
              <Icon size={19} strokeWidth={active ? 2.4 : 1.8} />
              <span style={{ fontSize: 10, fontFamily: "Inter, sans-serif", fontWeight: active ? 700 : 400 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
