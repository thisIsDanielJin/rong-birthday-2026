#!/bin/bash
# Audio Troubleshooting Script

echo "🎵 Audio Troubleshooting für Birthday Website"
echo "=============================================="
echo ""

cd /Users/I750579/Documents/rong-birthday-2026

echo "1️⃣ Checking if audio file exists..."
if [ -f "audio/song.mp3" ]; then
    echo "   ✅ audio/song.mp3 EXISTS"
    ls -lh audio/song.mp3
else
    echo "   ❌ audio/song.mp3 NOT FOUND!"
    exit 1
fi

echo ""
echo "2️⃣ Checking file permissions..."
if [ -r "audio/song.mp3" ]; then
    echo "   ✅ File is readable"
else
    echo "   ❌ File is NOT readable"
fi

echo ""
echo "3️⃣ Checking file size..."
SIZE=$(stat -f%z "audio/song.mp3")
if [ "$SIZE" -gt 1000000 ]; then
    echo "   ✅ File size: $(ls -lh audio/song.mp3 | awk '{print $5}')"
else
    echo "   ⚠️  File might be corrupt (too small)"
fi

echo ""
echo "4️⃣ Checking HTML audio element..."
if grep -q 'id="birthday-audio"' index.html; then
    echo "   ✅ Audio element found in HTML"
else
    echo "   ❌ Audio element NOT in HTML"
fi

echo ""
echo "5️⃣ Checking JavaScript audio code..."
if grep -q 'birthday-audio' scripts/vinyl-player.js; then
    echo "   ✅ Audio code found in JavaScript"
else
    echo "   ⚠️  Audio code might need update"
fi

echo ""
echo "6️⃣ Testing audio file (playing 3 seconds)..."
afplay audio/song.mp3 &
AUDIO_PID=$!
sleep 3
kill $AUDIO_PID 2>/dev/null
echo "   ✅ Audio playback test complete"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 INSTRUCTIONS TO PLAY MUSIC:"
echo ""
echo "1. Open website: open index.html"
echo "2. Click envelope to open"
echo "3. Scroll to Vinyl Player section"
echo "4. Click the button '▶ Klicke zum Abspielen'"
echo "5. OR click directly on the vinyl record"
echo ""
echo "⚠️  IMPORTANT:"
echo "   - Music only plays AFTER you click"
echo "   - Browser security prevents auto-play"
echo "   - Make sure your volume is on!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Opening website now..."
open index.html
echo ""
echo "✅ If you still don't hear music, check browser console (F12)"
