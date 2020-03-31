if(!navigator.requestMIDIAccess){
    alert('This app needs Google Chrome (WebMIDI) to work!')
}

var ma;
var out;
var device_id = 0x00; // all devices

const restore_factory_settings = [0xf0, 0x00, 0x20, 0x32, 0x00, 0x01, 0x0c, device_id, 0x7d, 0xf7];

function initMA(f){
    navigator.requestMIDIAccess({sysex: true}).then(
        ma_ => {
            ma=ma_;
            var outs = [];
            ma.outputs.forEach(x=>outs.push(x))
            out = outs.filter(o=>o.name==="POLY D MIDI 1")[0];
            console.log(out);
            if (f) {
                f();
            }
        }
    )
}

function send(msg){
    if (out===undefined){
        initMA(_=>{        
            out.send(msg);
        })
    } else {
        out.send(msg);
    }
}

function sliderChangedFn(fn,eid){
    return e => {
        document.getElementById(eid).innerHTML=e.value;
        fn(parseInt(e.value))
    }
}
