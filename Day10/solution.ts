type StreetSuffixTester<StreetStr extends string, SuffixStr extends string> = 
    StreetStr extends `${infer Prefix}${SuffixStr}` ? true : false;
