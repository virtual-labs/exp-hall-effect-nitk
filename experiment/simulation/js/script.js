let b = 3.60;
let hvoltage = 0;
let magi = 200;
let halli = 0;
let e = 1.6 * Math.pow(10, -19);
let c = 0;
let concentration;
let magcount = -1;
let hallcount = -1;
let sampleXarray = [];
let sampleYarray = [];
let ibXarray = [];
let ibYarray = [];
let blurr;
let pcheck;
let table;
let ibtable;
let row;
let ibrow;
let rH = 0;
let raisedtoTen;

function blurring() {
    if (blurr == true) {
        document.getElementById("simoptions").style.filter = 'blur(2px)';
        document.getElementById("mainsimulation").style.filter = 'blur(2px)';
        document.getElementById("buttondown").style.filter = 'blur(2px)';
    } else if (blurr == false) {
        document.getElementById("simoptions").style.filter = 'blur(0px)';
        document.getElementById("mainsimulation").style.filter = 'blur(0px)';
        document.getElementById("buttondown").style.filter = 'blur(0px)';
    }
}

// Next button
let a = 1;

function up() {
    a += 1;
    next()
}

function down() {
    a -= 1;
    next()
}

function next() {
    if (a == 1) {
        document.getElementById("buttondown").style.display = 'none';
        document.getElementById("buttonup").style.display = 'block';
        document.getElementById("content").style.display = 'block';
        document.getElementById("content2").style.display = 'none';
    } else if (a == 2) {
        document.getElementById("buttondown").style.display = 'block';
        document.getElementById("content").style.display = 'none';
        document.getElementById("content2").style.display = 'block';
        document.getElementById("content3").style.display = 'none';
        document.getElementById("buttonup").style.display = 'none';
        document.getElementById("observation").style.display = 'none';
    } else if (a == 3) {
        document.getElementById("buttonup").style.display = 'none';
        document.getElementById("content2").style.display = 'none';
        document.getElementById("content3").style.display = 'block';
        closeobservation();
        plotting();
    }
}

// procedure selection
function update() {
    let select = document.getElementById('exp');
    let option = select.options[select.selectedIndex].value;
    if (option == 'mfield vs current') {
        document.getElementById("insert").innerHTML = 'Insert Hall Sensor';
        document.getElementById("remove").innerHTML = 'Remove Hall Sensor';
        document.getElementById("circuit1").style.display = 'block';
        document.getElementById("circuit2").style.display = 'none';
        document.getElementById("circuit3").style.display = 'none';
        document.getElementById("circuit4").style.display = 'none';
        document.getElementById("fieldvalue").style.display = 'block';
        document.getElementById("voltagevalue").style.display = 'none';
        document.getElementById("insert").disabled = false;
        document.getElementById("electromagnet").style.display = 'block';
        document.getElementById("ammeter").style.display = 'block';
        document.getElementById("digitalgaussmeter").style.display = 'block';
        document.getElementById("hallsensor").style.display = 'block';
        document.getElementById("hprobe").style.display = 'none';
        document.getElementById("powersupply").style.display = 'none';
        pcheck = true;
        slider_reset();
        disable();
        remove();
    } else if (option == 'Hall Effect') {
        document.getElementById("insert").innerHTML = 'Insert Probe';
        document.getElementById("remove").innerHTML = 'Remove Probe';
        document.getElementById("insert").disabled = false;
        document.getElementById("circuit1").style.display = 'none';
        document.getElementById("circuit2").style.display = 'none';
        document.getElementById("circuit3").style.display = 'block';
        document.getElementById("circuit4").style.display = 'none';
        document.getElementById("fieldvalue").style.display = 'none';
        document.getElementById("voltagevalue").style.display = 'block';
        document.getElementById("electromagnet").style.display = 'block';
        document.getElementById("ammeter").style.display = 'block';
        document.getElementById("digitalgaussmeter").style.display = 'none';
        document.getElementById("hallsensor").style.display = 'none';
        document.getElementById("hprobe").style.display = 'block';
        document.getElementById("powersupply").style.display = 'block';
        pcheck = false;
        slider_reset();
        remove()
    }
}

function enable() {
    document.getElementById("materials").disabled = false;
}

function disable() {
    document.getElementById("materials").disabled = true;
}

// sensor/probe button
function insert() {
    document.getElementById("insert").style.display = 'none';
    document.getElementById("remove").style.display = 'block';

    document.getElementById("addbutton").disabled = false;
    document.getElementById("observationbutton").disabled = false;

    document.getElementById("cslider").style.opacity = '1';
    document.getElementById("cslider").disabled = false;

    if (pcheck == true) {
        document.getElementById("circuit1").style.display = 'none';
        document.getElementById("circuit2").style.display = 'block';
        document.getElementById("circuit4").style.display = 'none';
        document.getElementById("circuit3").style.display = 'none';

        document.getElementById("probe").style.display = 'block';
        document.getElementById("wire").style.display = 'block';

        document.getElementById("probe").style.animationName = 'probeslideup';
        document.getElementById("wire").style.animationName = 'wireslideup';

        document.getElementById("fieldvalue").innerText = b;

        document.getElementById("hprobe").style.display = 'none';
        document.getElementById("hallsensor").style.display = 'none';
    } else if (pcheck == false) {
        document.getElementById("circuit1").style.display = 'none';
        document.getElementById("circuit2").style.display = 'none';
        document.getElementById("circuit4").style.display = 'block';
        document.getElementById("circuit3").style.display = 'none';

        document.getElementById("hallprobe").style.display = 'block';
        document.getElementById("hallwire").style.display = 'block';

        document.getElementById("hallprobe").style.animationName = 'hallprobeslideup';
        document.getElementById("hallwire").style.animationName = 'hallwireslideup';

        document.getElementById("voltagevalue").innerText = hvoltage;

        document.getElementById("hprobe").style.display = 'none';
        document.getElementById("hallsensor").style.display = 'none';
        enable()
    }
}

function remove() {
    document.getElementById("remove").style.display = 'none';
    document.getElementById("insert").style.display = 'block';

    document.getElementById("fieldvalue").innerText = '0';
    document.getElementById("observationbutton").disabled = true;
    document.getElementById("addbutton").disabled = true;


    if (pcheck == true) {
        document.getElementById("circuit1").style.display = 'block';
        document.getElementById("circuit2").style.display = 'none';
        document.getElementById("circuit3").style.display = 'none';
        document.getElementById("circuit4").style.display = 'none';

        document.getElementById("cslider").style.opacity = '0.5';
        document.getElementById("cslider").disabled = true;

        document.getElementById("probe").style.display = 'none';
        document.getElementById("probe").style.animation = '';
        document.getElementById("wire").style.display = 'none';
        document.getElementById("wire").style.animation = '';

        document.getElementById("hallprobe").style.display = 'none';
        document.getElementById("hallprobe").style.animation = '';
        document.getElementById("hallwire").style.display = 'none';
        document.getElementById("hallwire").style.animation = '';

        document.getElementById("hprobe").style.display = 'none';
        document.getElementById("hallsensor").style.display = 'block';
    } else if (pcheck == false) {
        document.getElementById("circuit1").style.display = 'none';
        document.getElementById("circuit2").style.display = 'none';
        document.getElementById("circuit3").style.display = 'block';
        document.getElementById("circuit4").style.display = 'none';

        document.getElementById("cslider").style.opacity = '0.5';
        document.getElementById("cslider").disabled = true;

        document.getElementById("probe").style.display = 'none';
        document.getElementById("probe").style.animation = '';
        document.getElementById("wire").style.display = 'none';
        document.getElementById("wire").style.animation = '';

        document.getElementById("hallprobe").style.display = 'none';
        document.getElementById("hallprobe").style.animation = '';
        document.getElementById("hallwire").style.display = 'none';
        document.getElementById("hallwire").style.animation = '';

        document.getElementById("hprobe").style.display = 'block';
        document.getElementById("hallsensor").style.display = 'none';

        document.getElementById("voltagevalue").innerText = '0';
        disable()
    }
}

// current slider
let cslider = document.getElementById("cslider");
let coutput = document.getElementById("currentvalue");
coutput.innerHTML = cslider.value;
cslider.oninput = function () {
    coutput.innerHTML = this.value;
}

function slider_reset() {
    document.getElementById('currentvalue').innerText = "200";
    document.getElementById('cslider').value = 200;
    if (pcheck == true) {
        b = 3.60;
    } else if (pcheck == false) {
        optionmaterial();
    }
}

document.getElementById("materials").addEventListener("change", slider_reset);

function optionmaterial() {
    let select = document.getElementById('materials');
    let option = select.options[select.selectedIndex].value;
    if (option == 'Germanium') {
        hvoltage = 0.0006;
        document.getElementById("voltagevalue").innerHTML = hvoltage;
    } else if (option == 'Silicon') {
        hvoltage = 0.0079;
        document.getElementById("voltagevalue").innerHTML = hvoltage;
    } else if (option == 'Copper') {
        hvoltage = 0.0287;
        document.getElementById("voltagevalue").innerHTML = hvoltage;
    } else {
        document.getElementById("voltagevalue").innerHTML = 0;
    }
}

document.getElementById("cslider").addEventListener("change", slidercurrent);

function slidercurrent() {
    // current calculations
    if (pcheck == true) {
        document.getElementById("currentvalue").innerHTML = cslider.value;
        magi = cslider.value;
        let n = 200;
        let r = 0.01;
        let meu = ((4 * Math.PI) * (Math.pow(10, -7)));
        let multi = ((8) / (5 * (Math.sqrt(5))));
        b = (multi * ((meu * n * magi) / r));
        b = b.toFixed(2);
        document.getElementById("fieldvalue").innerHTML = b;
        // magnetic field = variable b 
    } else if (pcheck == false) {
        document.getElementById("currentvalue").innerHTML = cslider.value;
        magi = cslider.value;
        let n = 200;
        let r = 0.01;
        let meu = ((4 * Math.PI) * (Math.pow(10, -7)));
        let multi = ((8) / (5 * (Math.sqrt(5))));
        b = (multi * ((meu * n * magi) / r));
        b = b.toFixed(2);
        document.getElementById("fieldvalue").innerHTML = b;
        if (document.getElementById("materials").value == "Empty") {
            window.alert("Please select a material");
            slider_reset();
        } else {
            material()
            let ib = 60 * b * Math.pow(10, -7);
            let qnd = e * c * (0.01);
            hvoltage = (ib / qnd)
            hvoltage = hvoltage.toFixed(4);
            document.getElementById("voltagevalue").innerHTML = hvoltage;
        }
    }
};

document.getElementById("materials").addEventListener("change", material);
function material() {
    let select = document.getElementById('materials');
    let option = select.options[select.selectedIndex].value;
    if (option == 'Germanium') {
        c = 2.33 * Math.pow(10, 19);
        rH = (1 / (c * e)).toFixed(2);
        raisedtoTen = " x 10^ -11 m^3/C";
        concentration = "2.33 x 10^ 19";
    } else if (option == 'Silicon') {
        // doped silicon 
        c = 1.7 * Math.pow(10, 18);
        rH = (1 / (c * e)).toFixed(2);
        raisedtoTen = " x 10^ -4 m^3/C";
        concentration = "1.7 x 10^ 18";
    } else if (option == 'Copper') {
        c = 4.7 * Math.pow(10, 17);
        rH = (1 / (c * e)).toFixed(2);
        raisedtoTen = " x 10^ -11 m^3/C";
        concentration = "4.7 x 10^ 17";
    }
}

function Refresh() {
    window.location = window.location.href;
};

function openobservation() {
    if (pcheck == false) {
        document.getElementById("observation").style.display = 'block';
        document.getElementById('blocker').style.display = 'block';
    } else if (pcheck == true) {
        document.getElementById("IBobservation").style.display = 'block';
        document.getElementById('blocker').style.display = 'block';
    }
    blurr = true;
    blurring();
}

function closeobservation() {
    if (pcheck == false) {
        document.getElementById("observation").style.display = 'none';
    } else if (pcheck == true) {
        document.getElementById("IBobservation").style.display = 'none';
    }
    blurr = false;
    blurring();
    document.getElementById('IBgraph').style.display = 'none';
    document.getElementById('blocker').style.display = 'none';
    document.getElementById('myChart').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
}

function plotgraph() {
    // third page
    a = 3;
    next()
    document.getElementById("finalresult").disabled = false;
}


// 3rd page
function plotting() {
    let xArray = [];
    let yArray = [];

    sampleXarray = sortingArray(sampleXarray);
    sampleYarray = sortingArray(sampleYarray);

    xArray = sampleXarray.slice();
    yArray = sampleYarray.slice();

    // Define Data
    var data = [{
        x: xArray,
        y: yArray,
        type: 'scatter'
    }];

    // Define Layout
    var layout = {
        xaxis: {
            title: "Magnetic field (mT)"
        },
        yaxis: {
            title: "Hall Voltage (mV)"
        },
        title: "Hall Voltage (mV) vs Magnetic field (mV)"
    };

    // Display using Plotly
    Plotly.newPlot("graph", data, layout, {
        displaylogo: false
    });
}


function AddingToArray() {
    if (pcheck == false) {
        if (document.getElementById("materials").value == 'Empty') {
            window.alert("Please select a material");
        } else {
            sampleXarray.push(parseFloat(b));
            sampleYarray.push(parseFloat(hvoltage));
            document.getElementById('add').style.display = 'block';
            setTimeout(timer, 2000);
            addobservation();
        }
    } else if (pcheck == true) {
        ibXarray.push(parseFloat(magi));
        ibYarray.push(parseFloat(b));
        document.getElementById('add').style.display = 'block';
        setTimeout(timer, 2000);
        addobservation();
    }
}

function addobservation() {
    if (pcheck == false) {
        hallcount += 1;
        table = document.getElementById("observationTable");
        row = table.insertRow(hallcount + 1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = sampleXarray[sampleXarray.length - 1];
        cell2.innerHTML = sampleYarray[sampleYarray.length - 1];
    } else if (pcheck == true) {
        magcount += 1;
        ibtable = document.getElementById("IBobservationTable");
        ibrow = ibtable.insertRow(magcount + 1);
        let cell1 = ibrow.insertCell(0);
        let cell2 = ibrow.insertCell(1);
        cell1.innerHTML = ibXarray[ibXarray.length - 1];
        cell2.innerHTML = ibYarray[ibYarray.length - 1];
    }
}

function clearing() {
    if (pcheck == false) {
        for (var i = 1; i < table.rows.length;) {
            table.deleteRow(i);
        }
        hallcount = -1;
        sampleXarray.length = 0;
        sampleYarray.length = 0;
        document.getElementById("finalresult").disabled = true;
        document.getElementById('coefficientvalue').innerHTML = 0;
        document.getElementById('carriercon').innerHTML = 0;
    } else if (pcheck == true) {
        for (var i = 1; i < ibtable.rows.length;) {
            ibtable.deleteRow(i);
        }
        magcount = -1;
        ibXarray.length = 0;
        ibYarray.length = 0;
        document.getElementById("finalresult").disabled = true;
        document.getElementById('coefficientvalue').innerHTML = 0;
        document.getElementById('carriercon').innerHTML = 0;
    }
}

function timer() {
    document.getElementById('add').style.display = 'none';
}

function IBgraph() {
    document.getElementById('IBobservation').style.display = 'none'
    document.getElementById('IBgraph').style.display = 'block'
    document.getElementById('myChart').style.display = 'block'
    document.getElementById('blocker').style.display = 'block';

    let xValues = [];
    let yValues = [];

    ibXarray = sortingArray(ibXarray);
    ibYarray = sortingArray(ibYarray);

    xValues = ibXarray.slice();
    yValues = ibYarray.slice();

    // Define Data
    var data = [{
        x: xValues,
        y: yValues,
        type: 'scatter'
    }];

    // Define Layout
    var layout = {
        width: 700,
        height: 400,
        xaxis: {
            title: "Current (mA)"
        },
        yaxis: {
            range: [2, 10],
            title: "Magnetic Field(mT)"
        },
        title: "Current (mA) vs Magnetic field (mT)"
    };

    // Display using Plotly
    Plotly.newPlot("myChart", data, layout, { displayModeBar: false });
}

function help() {
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('blocker').style.display = 'block';
}

function sortingArray(sortarray) {
    const points = sortarray;
    return points.sort(function (a, b) {
        return a - b
    });
}

function hallcovalue() {
    document.getElementById('coefficientvalue').innerHTML = rH + raisedtoTen;
    document.getElementById('carriercon').innerHTML = concentration + " m^-3";
}