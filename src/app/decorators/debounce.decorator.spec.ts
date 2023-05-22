import { Debounce } from './debounce.decorator';

class Test {
   @Debounce()
   static tester() {
      return true;
   }
}

describe('Debounce Decorator', () => {
   it('should create an instance', () => {
      expect(Debounce).toBeTruthy();
   });

   it('should be able run decorator', () => {
      jest.useFakeTimers();
      const result = Test.tester();
      jest.advanceTimersByTime(1000);
      jest.useRealTimers();

      expect(result).toEqual(undefined);
   });
});