import {assert} from 'chai';
import "../src";
import "../src/EnArray"

describe('Array', function () {
        describe('#remove', function () {
            it('should remove an element from the array', function () {
                let arr = [1, 2, 3, 4];
                let elem = 2;
                arr.remove(elem);
                assert.deepEqual(arr, [1, 3, 4]);
            });
            it('should return true if the element was removed', function () {
                let arr = [1, 2, 3, 4];
                let elem = 2;
                let result = arr.remove(elem);
                assert.isTrue(result);
            });
            it('should return false if the element was not in the array', function () {
                let arr = [1, 2, 3, 4];
                let elem = 5;
                let result = arr.remove(elem);
                assert.isFalse(result);
            });
        });
        describe('#replace', function () {
            it('should replace an element in the array', function () {
                let arr = [{id: 1, value: 'a'}, {id: 2, value: 'b'}, {id: 3, value: 'c'}];
                let elem = {id: 2, value: 'x'};
                arr.replace(elem, (a, b) => a.id === b.id);
                assert.deepEqual(arr, [{id: 1, value: 'a'}, {id: 2, value: 'x'}, {id: 3, value: 'c'}]);
            });
            it('should return true if the element was replaced', function () {
                let arr = [{id: 1, value: 'a'}, {id: 2, value: 'b'}, {id: 3, value: 'c'}];
                let elem = {id: 2, value: 'x'};
                let result = arr.replace(elem, (a, b) => a.id === b.id);
                assert.isTrue(result);
            });
            it('should return false if the element was not found', function () {
                let arr = [{id: 1, value: 'a'}, {id: 2, value: 'b'}, {id: 3, value: 'c'}];
                let elem = {id: 4, value: 'x'};
                let result = arr.replace(elem, (a, b) => a.id === b.id);
                assert.isFalse(result);
            });
        });
        describe('#union', () => {
            it('should merge two arrays and remove duplicates', () => {
                const arr1 = [1, 2, 3];
                const arr2 = [2, 3, 4, 5];
                arr1.union(arr2, (e1, e2)=>e1==e2);
                assert.deepEqual(arr1, [1, 2, 3, 4, 5]);
            });

            it('should merge two arrays with custom matching function', () => {
                const arr1 = [{id: 1, name: 'John'}, {id: 2, name: 'Mary'}, {id: 3, name: 'Steve'}];
                const arr2 = [{id: 2, name: 'Mary'}, {id: 3, name: 'Steph'}];
                arr1.union(arr2, (a, b) => a.id === b.id);
                assert.deepEqual(arr1, [{id: 1, name: 'John'}, {id: 2, name: 'Mary'}, {id: 3, name: 'Steph'}]);
            });
        });
    }
)