/**
 * Tes Topik 1 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from 'vitest';
import {
  accessLetInTemporalDeadZone,
  buildLoopClosuresVarFixedWithIIFE,
  buildLoopClosuresWithLet,
  buildLoopClosuresWithVarBug,
  constBindingReassignThrows,
  instantiateClassBeforeDeclarationThrows,
  readVarBeforeAssignmentInSameFunction,
  typeofHoistedFunctionDeclaration,
  typeofLetInTemporalDeadZone,
  typeofUndeclaredName,
  typeofVarFunctionExpressionBeforeLine,
} from './hoisting-var-let-const-tdz.js';

describe('Topik 1 — hoisting / let / const / TDZ', () => {
  describe('buildLoopClosuresWithLet', () => {
    it('setiap callback mengembalikan indeks iterasinya (bukan nilai akhir loop)', () => {
      const fns = buildLoopClosuresWithLet(3);
      expect(fns.map((fn) => fn())).toEqual([0, 1, 2]);
    });

    it('n = 0 mengembalikan array kosong', () => {
      expect(buildLoopClosuresWithLet(0)).toEqual([]);
    });

    it('menolak input bukan bilangan bulat tak-negatif (kontrak API)', () => {
      expect(() => buildLoopClosuresWithLet(-1)).toThrow(RangeError);
      expect(() => buildLoopClosuresWithLet(1.5)).toThrow(RangeError);
      expect(() => buildLoopClosuresWithLet(NaN)).toThrow(RangeError);
    });
  });

  describe('buildLoopClosuresVarFixedWithIIFE', () => {
    it('var + IIFE setara perilaku let untuk closure di loop', () => {
      const fns = buildLoopClosuresVarFixedWithIIFE(4);
      expect(fns.map((fn) => fn())).toEqual([0, 1, 2, 3]);
    });

    it('menolak input bukan bilangan bulat tak-negatif (kontrak API)', () => {
      expect(() => buildLoopClosuresVarFixedWithIIFE(-2)).toThrow(RangeError);
    });
  });

  describe('buildLoopClosuresWithVarBug', () => {
    it('var + closure tanpa IIFE/let: semua callback melihat nilai akhir i (= n)', () => {
      const fns = buildLoopClosuresWithVarBug(3);
      expect(fns.map((fn) => fn())).toEqual([3, 3, 3]);
    });

    it('n = 0 mengembalikan array kosong', () => {
      expect(buildLoopClosuresWithVarBug(0)).toEqual([]);
    });

    it('menolak input bukan bilangan bulat tak-negatif (kontrak API)', () => {
      expect(() => buildLoopClosuresWithVarBug(-1)).toThrow(RangeError);
    });
  });

  describe('readVarBeforeAssignmentInSameFunction', () => {
    it('var di-hoist sebagai undefined sebelum assignment', () => {
      expect(readVarBeforeAssignmentInSameFunction()).toBeUndefined();
    });
  });

  describe('typeofUndeclaredName', () => {
    it("typeof nama yang tidak pernah dideklarasikan adalah 'undefined'", () => {
      expect(typeofUndeclaredName()).toBe('undefined');
    });
  });

  describe('TDZ — let', () => {
    it('akses let sebelum inisialisasi melempar ReferenceError', () => {
      expect(() => accessLetInTemporalDeadZone()).toThrow(ReferenceError);
    });

    it('typeof pada let di TDZ tetap ReferenceError (bukan string)', () => {
      expect(() => typeofLetInTemporalDeadZone()).toThrow(ReferenceError);
    });
  });

  describe('TDZ — class', () => {
    it('new Class() sebelum baris class melempar ReferenceError', () => {
      expect(() => instantiateClassBeforeDeclarationThrows()).toThrow(ReferenceError);
    });
  });

  describe('const', () => {
    it('assign ulang binding const melempar TypeError', () => {
      expect(() => constBindingReassignThrows()).toThrow(TypeError);
    });
  });

  describe('function declaration vs expression (var)', () => {
    it('function declaration di-hoist — typeof sebelum baris teks adalah function', () => {
      expect(typeofHoistedFunctionDeclaration()).toBe('function');
    });

    it('function expression pada var — typeof sebelum assignment adalah undefined', () => {
      expect(typeofVarFunctionExpressionBeforeLine()).toBe('undefined');
    });
  });
});
