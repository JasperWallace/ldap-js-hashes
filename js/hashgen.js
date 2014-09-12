
function calculateHashes()
{
	var str = document.getElementById("password").value;

	var NTLMHash = "";

	/* this is:
	
	NThash=MD4(UTF-16-LE(password))

	- or -

	echo -n "fish1234" | iconv -t utf-16le | openssl md4

	It does appear that hex_md4 and friends do do utf-16le.
	
	*/

	NTLMHash = hex_md4(str);

	document.getElementById("NTLMv2").value = NTLMHash;

	/* SSHA infos:
	
		http://www.openldap.org/faq/data/cache/347.html
		
		https://code.google.com/p/crypto-js/
	
	 */
	var salt = CryptoJS.lib.WordArray.random(4);
	var shahash = CryptoJS.algo.SHA1.create();
	shahash.update(str);
	shahash.update(salt);
	
	var hash = shahash.finalize();
	
	hash = hash.concat(salt);
	
	var out = "{SSHA}" + CryptoJS.enc.Base64.stringify(hash);
	
	document.getElementById("ssha").value = out;
}
