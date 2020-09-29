function nn(data, w12, bias2, w23, bias3) {
    // just some incomplete sanity checks to find the most obvious errors
    if (!Array.isArray(data) || data.length == 0 ||
        !Array.isArray(w12) || w12.length == 0 || !Array.isArray(w12[0]) || data.length != w12[0].length || !Array.isArray(bias2) || bias2.length != w12.length ||
        !Array.isArray(w23) || w23.length == 0 || !Array.isArray(w23[0]) || w12.length != w23[0].length || !Array.isArray(bias3) || bias3.length != w23.length) {
        console.error('nn(): invalid parameters');
        console.log('d: '+data.length+', w12: '+w12.length+', w12[0]: '+w12[0].length+', bias2: '+bias2.length+
                    ', w23: '+w23.length+', w23[0]: '+w23[0].length+', bias3: '+bias3.length);
        return undefined;
    }
    var t1 = new Date();// for detecting the time 
    
    // compute layer2 output
    var out2 = [];
    for (var i=0; i<w12.length; i++) {
      out2[i] = bias2[i];
      for (var j=0; j<w12[i].length; j++) {
        out2[i] += data[j] * w12[i][j];
      }
      out2[i] = 1 / (1 + Math.exp(-out2[i]));
    }
    //compute layer3 activation
    var out3 = [];
    for (var i=0; i<w23.length; i++) {
      out3[i] = bias3[i];
      for (var j=0; j<w23[i].length; j++) {
        out3[i] += out2[j] * w23[i][j];
      }
    }

    module.exports={nn};