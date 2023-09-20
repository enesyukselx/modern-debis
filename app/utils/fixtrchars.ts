const fixTrChars = (value: string) => {
    return value
        .replace(/Ä±/g, "ı")
        .replace(/ÅŸ/g, "ş")
        .replace(/Ã§/g, "ç")
        .replace(/Ã¶/g, "ö")
        .replace(/Ã¼/g, "ü")
        .replace(/ÄŸ/g, "ğ")
        .replace(/Ã/g, "Ü")
        .replace(/Ã/g, "Ö")
        .replace(/Ä/g, "Ğ")
        .replace(/Ä°/g, "İ")
        .replace(/Å/g, "Ş")
        .replace(/Ã/g, "Ç");
};

export default fixTrChars;
