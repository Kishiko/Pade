window.addEventListener("load", function()
{
    console.log(chrome.i18n.getMessage('manifest_shortExtensionName') + " is trying to get permissions to use your video/audio devices");

    // webrtc permission for mic and webcam for first time log-in

    if (!window.localStorage["store.settings.server"])
    {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(stream)
        {
            console.log(chrome.i18n.getMessage('manifest_shortExtensionName') + " now has permissions to use your video/audio devices");

            setTimeout(function()
            {
                stream.getAudioTracks().forEach(function (track)
                {
                    console.log("stopping track")
                    track.stop();
                });

            }, 30000);
        })
        .catch(function(err) {
            alert("To experience the full functionality of " + chrome.i18n.getMessage('manifest_shortExtensionName') + ", please connect audio and video devices.");
            console.error("Error trying to get the stream:: " + err.message);
        });

        // register MIDI permissions for APC

        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    }

    function onMIDISuccess(midiAccess) {
        console.log('MIDI Access Object', midiAccess);
    }

    function onMIDIFailure(e) {
        console.error("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
    }
});