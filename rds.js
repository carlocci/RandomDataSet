(function(){
var RDS
  , p;

RDS = {
	version: 0.1,
	list: function(times) { var ret;
		ret = [];
		if (typeof times != "number") times = 1;
		if (times < 1) times = 0;
		return function(tpl) {
			while (times--) ret.push(RDS.single(tpl));
			return ret;
		};
	},
	single: function(obj) { var p, q, ret;
		if (typeof obj == 'string') return RDS.render(obj);
		if (isArray(obj)) ret = [];
		else                    ret = {};
		for (p in obj) {
			if (obj.hasOwnProperty(p)) {
				q = RDS.render(p);
				if (typeof obj[p] === "string") ret[q] = RDS.render(obj[p]);
				else                            ret[q] = RDS.single(obj[p]);
			}
		}
		return ret;
	},
	render: function(s) {
		return s.replace(/%([A-Z][a-z]*)%/g, function(str, a) { var t;
			t = RDS.molecules[a];
			if (t != null) return t;
			else           return "%" + a + "%";
		})
		.replace(/%([a-z]+)%/g, function(str, a) { var t;
			t = RDS.atoms[a];
			if (t != null) return isArray(t) ? pick(t) : t(str, a);
			else           return "%" + a + "%";
		})
		// TODO: support for aliases
		/*.replace(/(#|§)/g, function(str, a) { var t;
			t = RDS.aliases[a];
			if (t != null) return parseStuff;
			else           return "%" + a + "%";
		});*/
		.replace(/(#|§)/g, function(str, a) {
			if (a == "#") return Math.floor(Math.random() * 10);
			if (a == "§") return "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));
		});
	},
	get: function(s) {
		return RDS.render("%" + s + "%");
	},
	aliases: {
		"#": "[0-9]",
		"§": "[a-z]"
	},
	atoms: {
		firstname:     ["Ash", "Bob", "Robert", "Alice", "Carl", "Charles", "John", "Richard", "Paul", "Mary", "Mark", "Michael", "Pearl", "Terence", "Philip", "Kyle", "Kevin", "Stanley", "Eric", "Clyde", "Corey", "Susan", "Paula", "Amy", "Lucy", "Youko", "Margaret", "Lisa", "Craig"],
		lastname:      ["Ketchum", "Paulson", "Bretford", "Ford", "Gates", "Page", "Bloomberg", "Cartman", "Broflowski", "Marsh", "March", "Livingstone", "Armstrong", "Tanzanian", "Heisenberg", "Gauss", "Heinsbergen", "Tenenbaum", "Gustavsson", "Schwarznegger", "Polo"],
		nickname:      ["god", "paul1234", "Kitty", "Doombringer", "Stormbringer", "Loki", "Poop", "paulie", "charlie", "bob98", "mylittlepony", "Polly", "pat1986", "maggie4"],
		tld:           ["com", "org", "net", "me", "it", "co.uk", "es", "de", "eu", "us", "co.jp", "dk", "fr", "pt", "at", "cc", "ph", "ch", "cn", "edu", "name", "mobi", "gov"],
		hostname:      ["google", "microsoft", "hotmail", "darpa", "livestock", "overkill", "weebl", "stuff", "money", "forbes", "amd", "intel", "apple", "panasonic"],
		companyname:   ["AMD", "Intel", "nVidia", "Asus", "ASRock", "Epox", "Abit", "HP", "Acer", "Samsung", "Sony", "Motorola", "HTC", "RIM", "Apple", "Google", "Logitech", "Western Digital", "Hitachi", "Maxtor", "Creative", "Linksys", "Microsoft", "LG", "Panasonic"],
		companysuffix: ["Inc", "LLC", "and Sons", "and Daughters"],
		productname:   ["Athlon XP 2400+", "i5 750", "sgh9001", "galaxy 2 S", "foo", "bar"],
		producttype:   ["Mobo", "CPU", "3d Card", "RAM", "Monitor", "HD", "PCI", "CD"]
	},
	molecules: {
		Name:    "%firstname% %lastname%",
		Email:   "%nickname%@%hostname%.%tld%",
		Site:    "http://www.%hostname%.%tld%",
		Company: "%companyname% %companysuffix%",
	}
};


if (typeof exports == 'object') for (p in RDS) exports[p] = RDS[p];
else                            window.RDS = RDS;

// Helpers
function pick(a) {
	return a[Math.floor(Math.random() * a.length)];
}

// Compatibility
function isArray(a) {
	if (Array.isArray) return Array.isArray(a);
	else               return a instanceof Array;
}
})();
