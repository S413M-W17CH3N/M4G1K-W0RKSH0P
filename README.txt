      _____  ___  _     ________  ____ _____  ______ _____ _____ _   __
     /  ___|/ _ \| |   |  ___|  \/  ( )  ___| | ___ \  _  |  _  | | / /
     \ `--./ /_\ \ |   | |__ | .  . |/\ `--.  | |_/ / | | | | | | |/ / 
      `--. \  _  | |   |  __|| |\/| |  `--. \ | ___ \ | | | | | |    \ 
     /\__/ / | | | |___| |___| |  | | /\__/ / | |_/ | \_/ | \_/ / |\  \
     \____/\_| |_|_____|____/\_|  |_/ \____/__\____/_\___/_\___/\_| \_/
               |  _  |  ___| |  \/  |/ _ \|  __ \_   _/  __ \          
       ______  | | | | |_    | .  . / /_\ \ |  \/ | | | /  \/  ______  
      |______| | | | |  _|   | |\/| |  _  | | __  | | | |     |______| 
               \ \_/ / |     | |  | | | | | |_\ \_| |_| \__/\          
                \___/\_|     \_|  |_|_| |_/\____/\___/ \____/          
                                                                  
                                                                  
                                            Author: ◄̷̧͜͡ S̶A̷͢1E͠͏͟M Ẁ1̶T̸̛͘C̨̨H̛3͝͠N̵►

=============------------------------------------------------------=============
[seg.0]
Table of Contents
    seg.1: A short overview of the application
    seg.2: A List of tools in Salem's Book of Magic
        seg.2-1: An example of G14SS-3Y3 which also explains the usage of the workload cluster.
    seg.3: End Points and Requests

[seg.1]
What is Salem's Book of Magic?

Salem's Book of Magic is a collection of Security Pen-Testing tools developed for
educational purpose. I will not be held liable for the use of this repository.

The tool suite centers around a REST Service known as "Magic-Workbench" which handles
application requests and delivers content to users.

There are a few endpoints available. For the examples throughout this documentation,
I will be using http://workbench.salems.world/ as the root api path url, if you host
this api, for obvious reasons, your root api url will be different.

To users of this software suite:
    This tool suite is in very early development, I'm currently focusing on getting
    the core of the suite working. This core includes the API, the library database,
    and the API's Spellbook. Other features planned in this software include various
    rootkits for IOS, Linux, Windows, Android, and iPhone, as well as a "man-in-the-middle"
    DNS service which can be used with the Raspberry Pi.

If you're wondering why the code has interesting naming conventions (and why it might not be the cleanest code),
I was not sober when writing the original version of this library. I plan to go in and refactor it so it's more
open-source friendly. That being said, the code is far from unreadable, it's just interesting...

If you wish to contribute to this library:
    If you're interested in helping with this library, pull requests are acceptable.
    Here is a list of things that anyone can do to help with the development of this
    tool suite:

    TASK LIST (as of 2017-08-23):
        - Create more sub services for foxy-haystack
            Desc:
                I know phishing is lame, but the sites in foxy-haystack will
                also be used by the "man-in-the-middle" service (which has yet
                to be actually named). This service overrides victim DNS settings
                so when a target hits a defined website, (ex. facebook.com) instead
                of getting facebook, they get the foxy-haystack version of facebook
                instead. After receiving a "login-attempt" from facebook, the mitm
                service will deliver back the actual site that is facebook.com.

                You can help develop these fake sites by forking the foxy-haystack
                repository and adding in your own sites. Please try to pay attention
                to sites that already exist, i want to try to only have on of each
                major site.

                I still need:
                    Paypal,
                    Twitter,
                    Instagram,
                    Tumblr,
                    Gmail,
                    Yahoo Mail,
                    and just about whatever else you can get into this.

                Please note the rootkits will also update DNS settings to hit the mitm
                so, this is believe it or not, a huge part of this repository.


[seg.2]
The repos in this suite (up-to-date as of 2017-08-23) include:
M4G1K W0RKB3NCH (REST Service):
    Desc: Magic Workbench (M4G1K-W0RKB3NCH), is the center of Salem's Book of Magic.
          This repository includes routes to various services used by Salem's Book of Magic.
    Routes:
        - /magic-gateway/ (used to manage Authentication, this is primaryly for third party applications)(In development)
        - /magic-gateway/keysmith (generates a 512 character key used for encrypting)
        - /nebula-lensus/ (Persistence manager that interacts with the Library of Magic)
        - /spellbook/ (Used to cron and user tasks to the "malware-cluster".) (in development)

Great Library of Magic History (Library Database) (Not yet public)
    Desc: The Great Library of Magic History handles encrypted data. It has a basic
            Data layout which simply takes in Strings, field_keys, field_values, and
            filter. The filter lets your sort through data. All data sent to this
            database (through means of the REST API) gets encrypted with a default
            encryption key generated by M4G1K W0RKB3NCH, unless the user passes
            a "lock" to the header of a /nebula-lensus/ post request, in this evenbt
            the data will be locked with the key passed in through "lock". Encryption
            Keys are never stored, so information can only be read through the GET
            request of /nebula-lensus/filter/{Your Filter} when you pass the encryption
            key to the header. If the library used a default encryption key, you can
            view the data by not sending "lock" the the request's header.
    Tables:
        - library (stores encrypted generic data rows)

foxy-haystack (A collection of various Phishing pages)(In the works, accepting PRs)
    Desc: foxy-haystack is a collection of various website clones. These clones communicate
            with M4G1K-W0RKB3NCH/nebula-lensus/ to create new entries in the great library.
            All of these pages should include a config.php which allows you to input a custom
            filter and an encryption key.
    "Sub-Processes":
        - facebook
        - snapchat (not yet public)

B14CK-M1RR0R (A mirror services, enables easy duplication of an instance of Salem's
                Book Of Magic) (Currently In Development)
    Desc:
        B14CK-M1RR0R (Black Mirror) is an optional service that allows API users to clone
        and create new nodes Salem's Book of M4G1K. This means, if one node gets taken down
        all the Rootkits and software that is out there will move off the broken node and
        target the next available node.

        Black Mirror does everything it can to preserve data across nodes, nodes may hit
        other nodes Mirrors just to make sure they're in sync with each other.

        This is currently what I am working on now, this software is a bit complex and may
        take a good chunk of my time to complete, if you would like to help this repository
        build faster, please take a look at the tasklist at the top of the page.

G14SS-3Y3 (R007k17 for windows) (Not yet in development)
    [seg.2-1][About Rootkits and the cluster]
    Desc:
        As for all the R007K175 in Salem's Book of magic, the job of the G14SS-3Y3 is to
        add an infected device to workload cluster. This workload cluster allows us to
        execute tools across a cluster of machines.

        Example:
            Suppose I needed to crack a password. I could, hypothetically speaking,
            run a command over the cluster that tells machines to calculate a different
            range of possible passwords. The workload will be divided up into the total
            number of possible passwords to generate, divided by the number of machines
            available to a given user on a given cluster. Machine Set A will generate
            Passwords from say the letters AAA-CCC ( assuming we're working with simple
            as hell passwords) while Machine Set B will work on Passwords from DAA-FFF.

        Note: There will be a few other repositories that do this same functionality
              but for different operating systems.

[seg.3]
M4G1K-W0RKB3NCH Endpoints and requests:
    Route: http://workbench.salems.world/nebula-lensus/
        Method: POST
        Desc: Adds an encrypted entry to the library database.
        Request:
            body:
                {
                    "field_key": "SomeExampleEmailAddress@email.com"
                    "field_value": "SomeExamplePasswordForTheAboveEmail",
                    "filter": "ExampleFilterThatLetsMeFindThisLater-Facebook-BecauseIknowTheDataIsForAFacebookAccount"
                }
            head:
                {
                    "Content-Type": "Application/Json",
                    "lock": "MyEncryptionKey"
                }
        Explained:
            body:
                field_key, is just whatever you wanna use for a "key".
                           Really this is just a string i use it for email addresses of whatever the value goes to.
                field_value, again just a string, would be, for example, the password to the email address in the key.

                filter, you will use this in a seperate requests that fetches everything for a filter. You define
                        this as whatever you'd like. it's for your sake to find data later.

            head:
                Content-Type, if you don't know what this is, you probably should read up on Web CRUD and REST before you
                              use this software suite...
                lock, a key to encrypt data being inserted into the library with. If this is undefined or null, the
                      public encryption key will be used instead. You may use a password for this, or generate an
                      encryption key with the keysmith route. Do note, these keys are not stored by the system,
                      if you lose your key, your data will be unreadable.
        Response:
            returns basic insertion status data, also includes the ID of the newly generated entry.
        Notes:
            The data that is passed from nebula-lensus to the library is referred to as a "book".

    Route: http://www.salems.world/nebula-lensus/filter/{filter}
        Method: GET
        Desc: Reads all encrypted entries defined by a given filter.
        Path Params:
            filter: The filter of entries to grab.
        Request:
            body:
                None.
            head:
                {
                    "Content-Type": "Application/Json",
                    "lock": "MyEncryptionKey"
                }
        Explained:
            body:
                None.
            head:
                Content-Type, if you don't know what this is, you probably should read up on Web CRUD and REST before you
                              use this software suite...
                lock, a key to decrypt the data being read from the library. You should pass through your encryption key
                      unless you used the public encryption key, in which case your data will be automagically decrypted
                      and returned for you.
        Response:
            returns a book entry from the library of magic
        Notes:
            The data that is passed from nebula-lensus to the library (and vice versa) is referred to as a "book".

    Route: http://www.salems.world/nebula-lensus/{id}
        Method: GET
        Desc: Reads an encrypted entry from the library database.
        Path Params:
            id: the id of the specific book entry to read.
        Request:
            body:
                None.
            head:
                {
                    "Content-Type": "Application/Json",
                    "lock": "MyEncryptionKey"
                }
        Explained:
            body:
                None.
            head:
                Content-Type, if you don't know what this is, you probably should read up on Web CRUD and REST before you
                              use this software suite...
                lock, a key to decrypt the data being read from the library. You should pass through your encryption key
                      unless you used the public encryption key, in which case your data will be automagically decrypted
                      and returned for you.
        Response:
            returns a book entry from the library of magic
        Notes:
            The data that is passed from nebula-lensus to the library (and vice versa) is referred to as a "book".

    Route: http://www.salems.world/magic-gateway/keysmith
        Method: GET
        Desc: Generates a 512 Character Encryption Key
        Request:
            body:
                None.
            head:
                 None. (Maybe Content-Type required? Will verify and update)
        Explained:
            body:
                None.
            head:
                None.
        Response:
            returns an encryption key
        Notes:
            These keys are not stored, they are generated once and forgotten forever, please save your
            keys somewhere safe and secure.



---------------------------------- page 1 --------------------------------------

Change the world, kid. there's nothing we can't do.                        1/1