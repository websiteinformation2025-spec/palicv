'use strict';

const DPR_Move = (function () {

  DPR_G.moveat = 2;

  async function moveframex(a,temp) //read, etc
  {
      if(!temp) await DPR_config_mod.getconfig();

  }

  async function moveframey(a,b) //dict, conv, pad, etc - a is button, b is div (opt)
  {
    if(!a && !b){
      return ;
    }

    if(a == 'dif' || a == 'cdif') a = 'difout';

    if(!b)
      b = a;

    if (DPR_G.moveat == 1) await moveframex(2);

      $('#difout').hide();
    $('#cof').hide();
    $('#scf').hide();
    $('#transf').hide();
    $('#conjf').hide();
    $('#bvf').hide();

    $('.bbart td').removeClass('sbarb');
    $('#'+a+'M').addClass('sbarb');

    $('#'+b).show();
  }

  DPR_G.cpout = 1;

  function moveframec() // open close control panel
  {
  }

  DPR_G.G_cpspeed = 50;

  function closeCP(wR) {
  }

  function openCP(wR) {
  }

  function cpFlatten(cpin) {
    var cpt = document.getElementById(cpin);
    var cptt = document.getElementById(cpin+'t');
    if(cpt.style.display=='none') {
      cpt.style.display='block';
      cptt.style.display='none';
      setMiscPref(cpin,'1');
    }
    else {
      cpt.style.display='none';
      cptt.style.display='block';
      setMiscPref(cpin,'0');
    }
  }

  function showHideId(a) {
    var sopts = document.getElementById(a);
    if(sopts.style.display=='block') {
      sopts.style.display='none';
    }
    else {
      sopts.style.display='block';
    }
  }

  function moves(a) // search open / close
  {
  }

  function moveanf(which) {
  }

  function scrolldown(much)
  {
    if (much == 'alert')
    {
      //alert('Scroll distance = ' + document.getElementById('maf').scrollTop);
      scrollmuch=document.getElementById('maf').scrollTop;
    }
    else document.getElementById('maf').scrollTop=much;
  }

  function getlink(which)
  {
    var linkfile = which + '.htm';
    parent.mainFrame.location = linkfile;
    scrollmuch = bookmarklink[which-1];
  }


  function go_anchor(mydiv,n){
      document.getElementById(mydiv).scrollTop = document.getElementById(n).offsetTop;
  }

  function scrollToId(a,b) {
    if(a=='search') a = 'sbfbc';
    if(a=='dif') a = 'cdif';
    document.getElementById(a).scrollTop=(typeof(b) == 'number' ? b : document.getElementById(b).offsetTop);
  }

  return {
    getlink,
    moves,
    scrollToId,
  }
})()

window.DPR_move_mod = DPR_Move
