import {
	getNormalizedNumber,
	getNormalizedRomanNumber,
	prependWithZeros,
	romanToIntStr,
	NumberRegex,
	CompoundNumberDotRegex,
	CompoundNumberDashRegex,
	RomanNumberRegex,
	CompoundRomanNumberDotRegex,
	CompoundRomanNumberDashRegex
} from "./matchers";

describe('Plain numbers regexp', () => {
	it.each([
		['', null],
		[' ', null],
		[' 1', '1'], // leading spaces are swallowed
		['-1', null],
		['1', '1'],
		['1a', '1'],
		['3580', '3580'],
		['9', '9'],
		['7328964783268794325496783', '7328964783268794325496783']
	])('%s => %s', (s: string, out: string | null) => {
		const match: RegExpMatchArray | null = s.match(NumberRegex)
		if (out) {
			expect(match).not.toBeNull()
			expect(match?.[1]).toBe(out)
		} else {
			expect(match).toBeNull()
		}
	})
})

describe('Plain compound numbers regexp (dot)', () => {
	it.each([
		['', null],
		[' ', null],
		[' 1', '1'], // leading spaces are swallowed
		['-1', null],
		['1', '1'],
		['1a', '1'],
		['3580', '3580'],
		['9', '9'],
		['7328964783268794325496783', '7328964783268794325496783'],
		['9.', '9'],
		['5.2', '5.2'],
		['5.-2', '5'],
		['12. 34', '12'],
		['.12  .34', null],
		['56.78.000.1', '56.78.000.1'],
		['56.78.000.1   ', '56.78.000.1'],
		['56.78.000.1abc', '56.78.000.1'],
		['56.78.-.1abc', '56.78'],
		['56.78-.1abc', '56.78'],
	])('%s => %s', (s: string, out: string | null) => {
		const match: RegExpMatchArray | null = s.match(CompoundNumberDotRegex)
		if (out) {
			expect(match).not.toBeNull()
			expect(match?.[1]).toBe(out)
		} else {
			expect(match).toBeNull()
		}
	})
})

describe('Plain compound numbers regexp (dash)', () => {
	it.each([
		['', null],
		[' ', null],
		[' 1', '1'], // leading spaces are swallowed
		['.1', null],
		['1', '1'],
		['1a', '1'],
		['3580', '3580'],
		['9', '9'],
		['7328964783268794325496783', '7328964783268794325496783'],
		['9-', '9'],
		['5-2', '5-2'],
		['5-.2', '5'],
		['12- 34', '12'],
		['-12  -34', null],
		['56-78-000-1', '56-78-000-1'],
		['56-78-000-1   ', '56-78-000-1'],
		['56-78-000-1abc', '56-78-000-1'],
		['56-78-.-1abc', '56-78'],
		['56-78.-1abc', '56-78'],
	])('%s => %s', (s: string, out: string | null) => {
		const match: RegExpMatchArray | null = s.match(CompoundNumberDashRegex)
		if (out) {
			expect(match).not.toBeNull()
			expect(match?.[1]).toBe(out)
		} else {
			expect(match).toBeNull()
		}
	})
})

describe('Plain Roman numbers regexp', () => {
	it.each([
		['', null],
		[' ', null],
		[' i', 'i'], // leading spaces are swallowed
		['-i', null],
		['i', 'i'],
		['ia', 'i'],
		['mdclxv', 'mdclxv'],
		['iiiii', 'iiiii'],
		['viviviv794325496783', 'viviviv']
	])('%s => %s', (s: string, out: string | null) => {
		const match: RegExpMatchArray | null = s.match(RomanNumberRegex)
		if (out) {
			expect(match).not.toBeNull()
			expect(match?.[1]).toBe(out)
		} else {
			expect(match).toBeNull()
		}
	})
})

describe('Roman compound numbers regexp (dot)', () => {
	it.each([
		['', null],
		[' ', null],
		[' I', 'I'], // leading spaces are swallowed
		['.I', null],
		['v', 'v'],
		['va', 'v'],
		['vava ', 'v'],
		['ix', 'ix'],
		['mclv96783', 'mclv'],
		['C.', 'C'],
		['v.ii', 'v.ii'],
		['xx.-x', 'xx'],
		['xx.x', 'xx.x'],
		['iv- v', 'iv'],
		['.12  .34', null],
		['vv.mc.lx.i', 'vv.mc.lx.i'],
		['mcm.m.mmm.l  ', 'mcm.m.mmm.l'],
		['iv.I.DDD.Iabc', 'iv.I.DDD.I'],
		['xiii.viii.-.1abc', 'xiii.viii'],
		['xvx.d-.iabc', 'xvx.d'],
		['xvx.d..iabc', 'xvx.d'],
	])('%s => %s', (s: string, out: string | null) => {
		const match: RegExpMatchArray | null = s.match(CompoundRomanNumberDotRegex)
		if (out) {
			expect(match).not.toBeNull()
			expect(match?.[1]).toBe(out)
		} else {
			expect(match).toBeNull()
		}
	})
})

describe('Roman compound numbers regexp (dash)', () => {
	it.each([
		['', null],
		[' ', null],
		[' I', 'I'], // leading spaces are swallowed
		['.I', null],
		['v', 'v'],
		['va', 'v'],
		['vava ', 'v'],
		['ix', 'ix'],
		['mclv96783', 'mclv'],
		['C-', 'C'],
		['v-ii', 'v-ii'],
		['xx.-x', 'xx'],
		['xx.x', 'xx'],
		['iv- v', 'iv'],
		['-12  -34', null],
		['vv-mc-lx-i', 'vv-mc-lx-i'],
		['mcm-m-mmm-l  ', 'mcm-m-mmm-l'],
		['iv-I-DDD-Iabc', 'iv-I-DDD-I'],
		['xiii-viii-.-1abc', 'xiii-viii'],
		['xvx-d.-iabc', 'xvx-d'],
		['xvx-d--iabc', 'xvx-d']
	])('%s => %s', (s: string, out: string | null) => {
		const match: RegExpMatchArray | null = s.match(CompoundRomanNumberDashRegex)
		if (out) {
			expect(match).not.toBeNull()
			expect(match?.[1]).toBe(out)
		} else {
			expect(match).toBeNull()
		}
	})
})

describe('prependWithZeros', () => {
	const Length = 5;
	it('should add leading zeros to empty string', () => {
		const s = prependWithZeros('', Length);
		expect(s).toBe('00000')
	})
	it('should add leading zeros to shorter string', () => {
		const s = prependWithZeros('12', Length);
		expect(s).toBe('00012')
	})
	it('should not add leading zeros to sufficient string', () => {
		const s = prependWithZeros('12345', Length);
		expect(s).toBe('12345')
	})
	it('should not add leading zeros to longer string', () => {
		const s = prependWithZeros('12345678', Length);
		expect(s).toBe('12345678')
	})
})

describe('getNormalizedNumber', () => {
	const LEN = 5;
	const params = [
		['', '00000000//', null],
		['1', '00000001//', undefined],
		['000', '00000000//', ' '],
		['000', '00000000//', ''],
		['1234567890123', '1234567890123//', ''],
		['1234567890123456789012345', '1234567890123456789012345//', ''], // No conversion to number should happen
		// Compound numbers - dot
		['1', '00000001//', '.'],
		['1 .1', '0000001 |00000001//', '.'],  // Invalid case, Regexp on matcher in the caller should guard against this
		['1. 1', '00000001|000000 1//', '.'],  // Invalid case, Regexp on matcher in the caller should guard against this
		['1..1', '00000001|00000001//', '.'],  // Edge case, consecutive separators treated as one
		['1.2', '00000001|00000002//', '.'],
		['1.2.', '00000001|00000002//', '.'],  // Edge case, trailing dangling separator is swallowed
		['1.2.3', '00000001|00000002|00000003//', '.'],
		['44.2314325423432.4', '00000044|2314325423432|00000004//', '.'],
		['0.0.0.0.', '00000000|00000000|00000000|00000000//', '.'], // Edge case, trailing dangling separator is swallowed
		['0.0.0.0', '00000000|00000000|00000000|00000000//', '.'],
		['0.0-0.0', '00000000|000000-0|00000000//', '.'], // Invalid case, Regexp on matcher in the caller should guard against this
		// Compound numbers - dash
		['1', '00000001//', '-'],
		['1 -1', '0000001 |00000001//', '-'],  // Invalid case, Regexp on matcher in the caller should guard against this
		['1- 1', '00000001|000000 1//', '-'],  // Invalid case, Regexp on matcher in the caller should guard against this
		['1--1', '00000001|00000001//', '-'],  // Edge case, consecutive separators treated as one
		['1-2', '00000001|00000002//', '-'],
		['1-2-', '00000001|00000002//', '-'],   // Edge case, trailing dangling separator is swallowed
		['1-2-3', '00000001|00000002|00000003//', '-'],
		['44-2314325423432-4', '00044|2314325423432|00004//', '-5'],
		['0-7-0-0-', '00000000|00000007|00000000|00000000//', '-'], // // Edge case, trailing dangling separator is swallowed
		['0-0.3-0', '00000|000.3|00000//', '-5'],
	];
	it.each(params)('>%s< should become %s (sep >%s<)', (s: string, out: string, separator?: string) => {
		if (separator === '-5') {
			expect(getNormalizedNumber(s, '-', LEN)).toBe(out)
		} else {
			expect(getNormalizedNumber(s, separator)).toBe(out)
		}
	})
})

describe('romanToIntStr', () => {
	const params = [
		['', '0'],
		['I', '1'],
		['II', '2'],
		['III', '3'],
		['IIII', '4'],
		['IIIII', '5'],
		['iv', '4'],
		['v', '5'],
		['vi', '6'],
		['vii', '7'],
		['viii', '8'],
		['iX', '9'],
		['x', '10'],
		['XI', '11'],
		['L', '50'],
		['C', '100'],
		['d', '500'],
		['M', '1000'],
		// formally correct, unused
		['iv', '4'],
		['iiv', '5'],
		['iiiv', '6'],
		['iiiiv', '7'],
		['iiiiiv', '8'],
		['12345', '0'],
	];
	it.each(params)('>%s< should be %s', (s: string, out: string) => {
		expect(romanToIntStr(s)).toBe(out)
	})
})

describe('getNormalizedRomanNumber', () => {
	const LEN = 5
	const params = [
		['', '00000//', null],
		['1', '00000//', undefined],
		['000', '00000//', ' '],
		['000', '00000//', ''],
		['1234567890123//', '00000//', ''],
		['00123', '00000//', ''],
		['1234567890123456789012345//', '00000//', ''], // No conversion to number should happen
		// Compound numbers - dot
		['i', '00001//', '.'],
		['ii .ii', '00002|00002//', '.'],  // Invalid case, Regexp on matcher in the caller should guard against this
		['iv. vi', '00004|00006//', '.'],  // Invalid case, Regexp on matcher in the caller should guard against this
		['X..C', '00010|00100//', '.'],  // Edge case, consecutive separators treated as one
		['C.M', '00100|01000//', '.'],
		['I.II.', '00001|00002//', '.'],  // Edge case, trailing dangling separator is swallowed
		['i.i.iv', '00001|00001|00004//', '.'],
		['MCMLXX.2314325423432.CM', '01970|00000|00900//', '.'],
		['0.0.0.0.', '00000|00000|00000|00000//', '.'], // Edge case, trailing dangling separator is swallowed
		['L.l.M.iiii', '00050|00050|01000|00004//', '.'],
		['v.v-v.v', '00005|00010|00005//', '.'], // Invalid case, Regexp on matcher in the caller should guard against this
		// Compound numbers - dash
		['i', '00001//', '-'],
		['ii -ii', '00002|00002//', '-'],  // Invalid case, Regexp on matcher in the caller should guard against this
		['iv- vi', '00004|00006//', '-'],  // Invalid case, Regexp on matcher in the caller should guard against this
		['X--C', '00010|00100//', '-'],  // Edge case, consecutive separators treated as one
		['C-M', '00100|01000//', '-'],
		['I-II-', '00001|00002//', '-'],  // Edge case, trailing dangling separator is swallowed
		['i-i-iv', '00001|00001|00004//', '-'],
		['MCMLXX-2314325423432-CM', '01970|00000|00900//', '-'],
		['0-0-0-0-', '00000|00000|00000|00000//', '-'], // Edge case, trailing dangling separator is swallowed
		['L-l-M-iiii', '00050|00050|01000|00004//', '-'],
		['v-v.v-v', '00005|00010|00005//', '-'], // Invalid case, Regexp on matcher in the caller should guard against this
	];
	it.each(params)('>%s< should become %s (sep >%s<)', (s: string, out: string, separator?: string) => {
		expect(getNormalizedRomanNumber(s, separator, LEN)).toBe(out)
	})
})
