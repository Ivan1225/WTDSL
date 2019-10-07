export default class Tokens {
    public static WITHIN = "Within";

    public static ENDWITHIN = "EndWithin";

    public static FOR = "For";

    public static ENDFOR = "EndFor";

    public static VISIT = "Visit";

    public static SELECT = "Select";

    public static EXPECT = "Expect";

    public static VALUE= "Value";

    public static OF = "of";

    public static IN = "in";

    public static IS = "is";

    public static CLICK = "Click";

    public static SHOULD = "should";

    public static BE = "be";

    public static WAIT = "Wait";

    public static FILL = "Fill";

    public static NOT = "not";

    public static CONTAIN  = "contain";
    
    public static ATTRIBUTE = "^\\[.*\\]";

    public static FROM = "from";

    public static STRING = "^\".*\"";

<<<<<<< HEAD
    public static NUMMBER = "^[1-9][0-9]+|[0-9]";
=======
    public static NUMMBER = "^[1-9]\d*$";
>>>>>>> parser

    public static VARIABLENAME = "^[a-zA-Z0-9_-]+";

    public static STRINGSTART= "^\".*";
   
    public static STRINGMIDDLE= "^.*";

    public static STRINGEND= "^.*\"";

    public static SELECTOR = "^{.*}"

}
