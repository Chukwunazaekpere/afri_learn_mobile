export const titleCase = (word: string | string[]) => {
    // console.log("\n\t word: ", word)
    let desiredString = "";
    if(typeof(word) === "string"){
        const trimmedWord = word.trim();
        // console.log("\n\t trimmedWord[0]: ", trimmedWord[0])
        if(trimmedWord[0]){
            let ww = trimmedWord[0].toUpperCase()
            let charIndex = 0;
            for(let char of trimmedWord.substring(1)){
                if(char === " "){
                    ww.concat(char, trimmedWord[charIndex+1].toUpperCase());
                    charIndex += 2;
                }else{
                    // console.log("\n\t desired-string ww: ", char, trimmedWord[charIndex], ww)
                    ww += char;
                    charIndex++;
                }
            };
            desiredString += ww;
        }
    };
    return desiredString
}


/**
 * Takes a word in Pascal case and return the required word in normal form
 * @param word the pascal-cased-string to be transformed
 */
export const camelCaseSeparator = (word: string) => {
    const titleCasedWord = titleCase(word);
    // console.log("\n\t Word: ", word, titleCasedWord)
    let requiredWord = "";
    let count = 0;
    for(let char of titleCasedWord){
        if(count !== 0){
            // console.log("\n\t char: ", char)
            if(char === char.toUpperCase()){
                requiredWord += " " + char;
            }else{
                requiredWord += char;
            }
        }else{
            requiredWord += char.toUpperCase()
        }
        count ++
    }
    // console.log("\n\t requiredWord: ", requiredWord)
    return requiredWord;
}