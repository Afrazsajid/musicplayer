from pydub import AudioSegment

# Load the audio file
audio = AudioSegment.from_file("C:/Users/Muhammad/Desktop/afraz projects/web development/musicplayer/songs/Arijit/shaayraana/Shaayraana.mp3")

# Split stereo audio into two mono channels
left_channel = audio.split_to_mono()[0]
right_channel = audio.split_to_mono()[1]

# Invert phase of one channel (e.g., right channel)
inverted_right_channel = right_channel.invert_phase()

# Combine the original left channel with the inverted right channel
vocals_removed = left_channel.overlay(inverted_right_channel)

# Export the processed audio
vocals_removed.export("output_audio_no_vocals.mp3", format="mp3")
