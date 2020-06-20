var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
var reflecteur = [25, 23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3, 1, -1, -3, -5, -7, -9, -11, -13, -15, -17, -19, -21, -23, -25];
var rotor32 = [12, -1, 23, 10, 2, 14, 5, -5, 9, -2, -13, 10, -2, -8, 10, -6, 6, -16, 2, -1, -17, -5, -14, -9, -20, -10];
var rotor31 = [1, 16, 5, 17, 20, 8, -2, 2, 14, 6, 2, -5, -12, -10, 9, 10, 5, -9, 1, -14, -2, -10, -6, 13, -10, -23];
var rotor22 = [25, 7, 17, -3, 13, 19, 12, 3, -1, 11, 5, -5, -7, 10, -2, 1, -2, 4, -17, -8, -16, -18, -9, -1, -22, -16];
var rotor21 = [3, 17, 22, 18, 16, 7, 5, 1, -7, 16, -3, 8, 2, 9, 2, -5, -1, -13, -12, -17, -11, -4, 1, -10, -19, -25];
var rotor12 = [17, 4, 19, 21, 7, 11, 3, -5, 7, 9, -10, 9, 17, 6, -6, -2, -4, -7, -12, -5, 3, 4, -21, -16, -2, -21];
var rotor11 = [10, 21, 5, -17, 21, -4, 12, 16, 6, -3, 7, -7, 4, 2, 5, -7, -11, -17, -9, -6, -9, -19, 2, -3, -21, -4];
var i = 0;
afficherTableaux();

function afficherTableaux() {
  alphabet.forEach((lettre, i) => {
      document.getElementById('reflecteur').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(reflecteur[i] < 0 ? '' : '+')}${reflecteur[i]}</span>`;
      document.getElementById('rotor32').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor32[i] < 0 ? '' : '+')}${rotor32[i]}</span>`;
      document.getElementById('rotor31').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor31[i] < 0 ? '' : '+')}${rotor31[i]}</span>`;
      document.getElementById('rotor22').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor22[i] < 0 ? '' : '+')}${rotor22[i]}</span>`;
      document.getElementById('rotor21').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor21[i] < 0 ? '' : '+')}${rotor21[i]}</span>`;
      document.getElementById('rotor12').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor12[i] < 0 ? '' : '+')}${rotor12[i]}</span>`;
      document.getElementById('rotor11').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor11[i] < 0 ? '' : '+')}${rotor11[i]}</span>`;
      document.getElementById('alphabet').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${lettre}</span>`;
  });
}

function tableauDefaut() {
  //console.log("tableaux");
  [...document.getElementById('alphabet').children].forEach((child) => {
    child.className = "border border-dark text-dark bg-light";
  });
  [...document.getElementById('rotor32').children].slice(1).forEach((child) => {
    child.className = "border border-dark text-dark bg-light";
  });
  [...document.getElementById('rotor31').children].slice(1).forEach((child) => {
    child.className = "border border-dark text-dark bg-light";
  });
  [...document.getElementById('rotor22').children].slice(1).forEach((child) => {
    child.className = "border border-dark text-dark bg-light";
  });
  [...document.getElementById('rotor21').children].slice(1).forEach((child) => {
    child.className = "border border-dark text-dark bg-light";
  });
  [...document.getElementById('rotor12').children].slice(1).forEach((child) => {
    child.className = "border border-dark text-dark bg-light";
  });
  [...document.getElementById('rotor11').children].slice(1).forEach((child) => {
    child.className = "border border-dark text-dark bg-light";
  });
  [...document.getElementById('reflecteur').children].forEach((child) => {
    child.className = "border border-dark text-dark bg-light";
  });
}

var encryptionEstSuivant;
function encrypterMessage() {
  encryptionEstSuivant = true;
  i=0;
  tableauDefaut();
  encrypter(i);
}

function etapeSuivante() {
  i++;
  tableauDefaut();
  if(encryptionEstSuivant) {
    configurerRotors();
    encrypter(i);
  }
  else {
    configurerRotors();
    decrypter(i);
  }
}

function decrypterMessage() {
  encryptionEstSuivant = false;
  i=0;
  tableauDefaut();
  decrypter(i);
}

function configurerRotors() {
  console.log('sss');
  var triplet13 = document.getElementById('triplet13').value;
  var triplet23 = document.getElementById('triplet23').value;
  var triplet33 = document.getElementById('triplet33').value;
  configurerRotorsCle(triplet13, triplet23, triplet33);
}
function configurerRotorsInverse() {
  var triplet13 = document.getElementById('triplet13').value;
  var triplet23 = document.getElementById('triplet23').value;
  var triplet33 = document.getElementById('triplet33').value;
  console.log(alphabet.length-triplet13, alphabet.length-triplet23, alphabet.length-triplet33);
  configurerRotorsCle(alphabet.length-triplet13, alphabet.length-triplet23, alphabet.length-triplet33);
}
function configurerRotorsCle(r1, r2, r3) {

  rotor11 = rotor11.concat(rotor11.splice(0,r1));
  rotor12 = rotor12.concat(rotor12.splice(0,r1));
  rotor21 = rotor21.concat(rotor21.splice(0,r2));
  rotor22 = rotor22.concat(rotor22.splice(0,r2));
  rotor31 = rotor31.concat(rotor31.splice(0,r3));
  rotor32 = rotor32.concat(rotor32.splice(0,r3));
  document.getElementById('reflecteur').innerHTML = '';
  document.getElementById('rotor32').innerHTML = '';
  document.getElementById('rotor31').innerHTML = '';
  document.getElementById('rotor22').innerHTML = '';
  document.getElementById('rotor21').innerHTML = '';
  document.getElementById('rotor12').innerHTML = '';
  document.getElementById('rotor11').innerHTML = '';
  document.getElementById('alphabet').innerHTML = '';

  alphabet.forEach((lettre, i) => {
      document.getElementById('reflecteur').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(reflecteur[i] < 0 ? '' : '+')}${reflecteur[i]}</span>`;
      document.getElementById('rotor32').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor32[i] < 0 ? '' : '+')}${rotor32[i]}</span>`;
      document.getElementById('rotor31').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor31[i] < 0 ? '' : '+')}${rotor31[i]}</span>`;
      document.getElementById('rotor22').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor22[i] < 0 ? '' : '+')}${rotor22[i]}</span>`;
      document.getElementById('rotor21').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor21[i] < 0 ? '' : '+')}${rotor21[i]}</span>`;
      document.getElementById('rotor12').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor12[i] < 0 ? '' : '+')}${rotor12[i]}</span>`;
      document.getElementById('rotor11').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${(rotor11[i] < 0 ? '' : '+')}${rotor11[i]}</span>`;
      document.getElementById('alphabet').innerHTML +=
        `<span class="border border-dark text-dark bg-light" style="min-width: 40px;">
          ${lettre}</span>`;
  });
}

function mod(n) {
  return ((n % 26) + 26) % 26;
}

function encrypter(i) {
  var lettre = document.getElementById('text1').value.trim().toUpperCase().split("")[i];
  var indiceLettreRotor11 = alphabet.indexOf(lettre);
  var indiceLettreRotor21 = mod(indiceLettreRotor11 + rotor11[indiceLettreRotor11]);
  var indiceLettreRotor31 = mod(indiceLettreRotor21 + rotor21[indiceLettreRotor21]);
  var indiceLettreReflecteurAller = mod(indiceLettreRotor31 + rotor31[indiceLettreRotor31]);
  var indiceLettreReflecteurRetour = mod(indiceLettreReflecteurAller + reflecteur[indiceLettreReflecteurAller]);
  var indiceLettreRotor32 = indiceLettreReflecteurRetour;
  var indiceLettreRotor22 = mod(indiceLettreRotor32 + rotor32[indiceLettreRotor32]);
  var indiceLettreRotor12 = mod(indiceLettreRotor22 + rotor22[indiceLettreRotor22]);
  var indiceLettreCrypte = mod(indiceLettreRotor12 + rotor12[indiceLettreRotor12]);

  [...document.getElementById('alphabet').children][indiceLettreRotor11].className = "border border-danger text-light bg-danger";
  [...document.getElementById('rotor11').children][indiceLettreRotor11].className = "border border-danger text-light bg-danger";
  [...document.getElementById('rotor21').children][indiceLettreRotor21].className = "border border-danger text-light bg-danger";
  [...document.getElementById('rotor31').children][indiceLettreRotor31].className = "border border-danger text-light bg-danger";
  [...document.getElementById('reflecteur').children][indiceLettreReflecteurAller].className = "border border-danger text-light bg-danger";
  [...document.getElementById('reflecteur').children][indiceLettreReflecteurRetour].className = "border border-primary text-light bg-primary";
  [...document.getElementById('rotor32').children][indiceLettreRotor32].className = "border border-primary text-light bg-primary";
  [...document.getElementById('rotor22').children][indiceLettreRotor22].className = "border border-primary text-light bg-primary";
  [...document.getElementById('rotor12').children][indiceLettreRotor12].className = "border border-primary text-light bg-primary";
  [...document.getElementById('alphabet').children][indiceLettreCrypte].className = "border border-primary text-light bg-primary";
  if(i === 0) {
    document.getElementById('text2').value = alphabet[indiceLettreCrypte];
  }
  else {
    document.getElementById('text2').value += alphabet[indiceLettreCrypte];
  }
}

function decrypter(i) {
  var lettre = document.getElementById('text2').value.trim().toUpperCase().split("")[i];
  var indiceLettreRotor11 = alphabet.indexOf(lettre);
  var indiceLettreRotor21 = mod(indiceLettreRotor11 + rotor11[indiceLettreRotor11]);
  var indiceLettreRotor31 = mod(indiceLettreRotor21 + rotor21[indiceLettreRotor21]);
  var indiceLettreReflecteurAller = mod(indiceLettreRotor31 + rotor31[indiceLettreRotor31]);
  var indiceLettreReflecteurRetour = mod(indiceLettreReflecteurAller + reflecteur[indiceLettreReflecteurAller]);
  var indiceLettreRotor32 = indiceLettreReflecteurRetour;
  var indiceLettreRotor22 = mod(indiceLettreRotor32 + rotor32[indiceLettreRotor32]);
  var indiceLettreRotor12 = mod(indiceLettreRotor22 + rotor22[indiceLettreRotor22]);
  var indiceLettreCrypte = mod(indiceLettreRotor12 + rotor12[indiceLettreRotor12]);

  [...document.getElementById('alphabet').children][indiceLettreRotor11].className = "border border-danger text-light bg-danger";
  [...document.getElementById('rotor11').children][indiceLettreRotor11].className = "border border-danger text-light bg-danger";
  [...document.getElementById('rotor21').children][indiceLettreRotor21].className = "border border-danger text-light bg-danger";
  [...document.getElementById('rotor31').children][indiceLettreRotor31].className = "border border-danger text-light bg-danger";
  [...document.getElementById('reflecteur').children][indiceLettreReflecteurAller].className = "border border-danger text-light bg-danger";
  [...document.getElementById('reflecteur').children][indiceLettreReflecteurRetour].className = "border border-primary text-light bg-primary";
  [...document.getElementById('rotor32').children][indiceLettreRotor32].className = "border border-primary text-light bg-primary";
  [...document.getElementById('rotor22').children][indiceLettreRotor22].className = "border border-primary text-light bg-primary";
  [...document.getElementById('rotor12').children][indiceLettreRotor12].className = "border border-primary text-light bg-primary";
  [...document.getElementById('alphabet').children][indiceLettreCrypte].className = "border border-primary text-light bg-primary";
  if(i === 0) {
    document.getElementById('text1').value = alphabet[indiceLettreCrypte];
  }
  else {
    document.getElementById('text1').value += alphabet[indiceLettreCrypte];
  }
}
