# RDS - generate a Random Data Set from an object template.

## Usage
	var tpl = {"%Name%" : {email: "%Email%", site: "%Site%", company: "%Company%", products: ["%productname%", "%productname%"]}};

	var rendered = RDS.single(tpl);
		{ 'Kevin Heisenberg': 
			{ email: 'bob98@darpa.org',
			site: 'http://www.amd.fr',
			company: 'RIM and Daughters',
			products: [ 'sgh9001', 'foo' ]
			}
		}

	var rendereds    = RDS.list(3)(tpl);        // A list of three objects
	var randomName   = RDS.get("Name");         // A random name
	var randomEmail  = RDS.get("Email");        // A random email address
	var randomNumber = RDS.single("####_#-###") // A random number, eg 1234_2-123
	var randomString = RDS.single("§§§hey§§§§") // A random string, eg rptheyppzx


## Extensibility
	RDS.atoms["newcategory"] = ["list", "of", "possible", "values", 1, 2 ,3];
	RDS.atoms["anotherone1"] = function(string, matchedString) {return something};

	// Notice the capital letter
	RDS.molecules["Compounded"] = "%newcategory% in %anothercategory1%";
	RDS.molecules["Email"]      = "%nickname%@%hostname%.%tld%";


## Builtin categories
	-firstname
	-lastname
	-nickname
	-tld
	-hostname
	-companyname
	-companysuffix
	-productname
	-producttype

	-Name
	-Email
	-Site
	-Company


## Node.js
Just require rds.js


## TODO
-Should add character classes like [a-z], [1-4] and support for aliases
-Should add more atoms

## LICENSE
MIT license, see license
