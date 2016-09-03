/*
  @flow
 */

jest.autoMockOff();

import { getPokemonCandyResume } from './pokemon-utils';

describe('Pokemon Utils', () => {

  describe('Pokemon Candy Resume', () => {

    describe('With 14 pidgeys and 144 candies', () => {
      let resume = getPokemonCandyResume({
        pokemonName: 'Pidgey',
        candies: 144,
        quantity: 14
      });

      it('Should have 13 pokemon to evolve', () => {
        expect(resume.pokemonsToEvolve).toEqual(13);
      });
      it('Should have 0 candies left', () => {
        expect(resume.candiesLeft).toEqual(0);
      });
      it('Should have 1 pidgey left', () => {
        expect(resume.pokemonsLeft).toEqual(1);
      });
    });

    describe('With 14 pidgeys and 0 candies', () => {
      let resume = getPokemonCandyResume({
        pokemonName: 'Pidgey',
        candies: 0,
        quantity: 14
      });

      it('Should have 1 pokemon to evolve', () => {
        expect(resume.pokemonsToEvolve).toEqual(1);
      });
      it('Should have 0 candy left', () => {
        expect(resume.candiesLeft).toEqual(0);
      });
      it('Should have 1 pidgey left', () => {
        expect(resume.pokemonsLeft).toEqual(1);
      });
    });

    describe('With 1 pidgey and 24 candies', () => {
      let resume = getPokemonCandyResume({
        pokemonName: 'Pidgey',
        candies: 24,
        quantity: 1
      });

      it('Should have 1 pokemon to evolve', () => {
        expect(resume.pokemonsToEvolve).toEqual(1);
      });
      it('Should have 13 candy left', () => {
        expect(resume.candiesLeft).toEqual(13);
      });
      it('Should have 0 pidgey left', () => {
        expect(resume.pokemonsLeft).toEqual(0);
      });
    });

    describe('With 3 caterpies and 34 candies', () => {
      let resume = getPokemonCandyResume({
        pokemonName: 'Caterpie',
        candies: 34,
        quantity: 3
      });

      it('Should have 3 pokemon to evolve', () => {
        expect(resume.pokemonsToEvolve).toEqual(3);
      });
      it('Should have 0 candy left', () => {
        expect(resume.candiesLeft).toEqual(0);
      });
      it('Should have 0 caterpie left', () => {
        expect(resume.pokemonsLeft).toEqual(0);
      });
    });

    it("Should earn 500 xp per evolution and spend 24 seconds on each evo", () => {
      let resume = getPokemonCandyResume({
        pokemonName: 'Pidgey',
        candies: 12,
        quantity: 1
      });

      expect(resume.xp).toEqual(500);
      expect(resume.xpWithLuckyEgg).toEqual(1000);
      expect(resume.time).toEqual(24);
    });

  });
});
