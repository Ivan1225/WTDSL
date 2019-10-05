export default class Tokenizer{
  private static theTokenizer: Tokenizer;

  /**
   * getTokenizer
   */
  public static getTokenizer(): Tokenizer {
      return Tokenizer.theTokenizer;     
  }


}