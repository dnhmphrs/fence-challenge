export var pentominosKey = {
	1: 'F',
	2: 'I',
	3: 'L',
	4: 'N',
	5: 'P',
	6: 'T',
	7: 'U',
	8: 'V',
	9: 'W',
	10: 'X',
	11: 'Y',
	12: 'Z'
};

export var pentominosReverseKey = {
	F: 1,
	I: 2,
	L: 3,
	N: 4,
	P: 5,
	T: 6,
	U: 7,
	V: 8,
	W: 9,
	X: 10,
	Y: 11,
	Z: 12
};

export var pentominosDict = {
	F: {
		letter: 'F',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-1, 0],
			[-1, 2],
			[0, 2],
			[0, 1],
			[2, 1],
			[2, 0],
			[1, 0],
			[1, -1],
			[0, -1],
			[0, 0],
			[-1, 0],
			[-1, 0]
		],
		offsets: [
			[0, 1],
			[1, 1],
			[-1, 0],
			[0, -1]
		],
		centerOffset: [0, 0],
		rotations: 0,
		flip: 0
	},
	I: {
		letter: 'I',
		width: 1,
		height: 5,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[0, 3],
			[1, 3],
			[1, -2],
			[0, -2],
			[0, 3]
		],
		offsets: [
			[0, -2],
			[0, -1],
			[0, 1],
			[0, 2]
		],
		centerOffset: [0, 0],
		rotations: 0,
		flip: 0
	},
	L: {
		letter: 'L',
		width: 2,
		height: 4,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-0.5, 2.5],
			[1.5, 2.5],
			[1.5, 1],
			[1.5, -1.5],
			[0.5, -1.5],
			[0.5, 1.5],
			[-0.5, 1.5],
			[-0.5, 2.5]
		],
		offsets: [
			[0, 2],
			[0, 1],
			[0, -1],
			[1, -1]
		],
		centerOffset: [0.5, 0.5],
		rotations: 0,
		flip: 0
	},
	N: {
		letter: 'N',
		width: 2,
		height: 4,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-1.5, 0.5],
			[-0.5, 0.5],
			[-0.5, 1.5],
			[2.5, 1.5],
			[2.5, 0.5],
			[0.5, 0.5],
			[0.5, -0.5],
			[-1.5, -0.5],
			[-1.5, 0.5]
		],
		offsets: [
			[1, 1],
			[1, 0],
			[0, -1],
			[0, -2]
		],
		centerOffset: [0.5, -0.5],
		rotations: 0,
		flip: 0
	},
	P: {
		letter: 'P',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-1, -1],
			[-1, 0],
			[0, 0],
			[0, 1],
			[2, 1],
			[2, -1],
			[-1, -1]
		],
		offsets: [
			[0, 1],
			[1, 1],
			[1, 0],
			[0, -1]
		],
		centerOffset: [1, 0],
		rotations: 0,
		flip: 0
	},
	T: {
		letter: 'T',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-1, 2],
			[2, 2],
			[2, 1],
			[1, 1],
			[1, -1],
			[0, -1],
			[0, 1],
			[-1, 1],
			[-1, 2]
		],
		offsets: [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, -2]
		],
		centerOffset: [0, -1],
		rotations: 0,
		flip: 0
	},
	U: {
		letter: 'U',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-1, 1],
			[0, 1],
			[0, 0],
			[1, 0],
			[1, 1],
			[2, 1],
			[2, -1],
			[-1, -1],
			[-1, 1]
		],
		offsets: [
			[-1, 0],
			[-1, 1],
			[1, 0],
			[1, 1]
		],
		centerOffset: [0, 1],
		rotations: 0,
		flip: 0
	},
	V: {
		letter: 'V',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-1, 2],
			[0, 2],
			[0, 0],
			[1, 0],
			[2, 0],
			[2, -1],
			[-1, -1],
			[-1, 2]
		],
		offsets: [
			[0, 1],
			[0, 2],
			[1, 0],
			[2, 0]
		],
		centerOffset: [1, 1],
		rotations: 0,
		flip: 0
	},
	W: {
		letter: 'W',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-1, -1],
			[-1, 1],
			[0, 1],
			[0, 2],
			[2, 2],
			[2, 1],
			[1, 1],
			[1, 0],
			[0, 0],
			[0, -1],
			[-1, -1]
		],
		offsets: [
			[-1, 0],
			[-1, 1],
			[0, -1],
			[1, -1]
		],
		centerOffset: [0, 0],
		rotations: 0,
		flip: 0
	},
	X: {
		letter: 'X',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-1, 1],
			[0, 1],
			[0, 2],
			[1, 2],
			[1, 1],
			[2, 1],
			[2, 0],
			[1, 0],
			[1, -1],
			[0, -1],
			[0, 0],
			[-1, 0],
			[-1, 1]
		],
		offsets: [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0]
		],
		centerOffset: [0, 0],
		rotations: 0,
		flip: 0
	},
	Y: {
		letter: 'Y',
		width: 2,
		height: 4,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-1.5, 1.5],
			[2.5, 1.5],
			[2.5, 0.5],
			[1.5, 0.5],
			[1.5, -0.5],
			[0.5, -0.5],
			[0.5, 0.5],
			[-1.5, 0.5],
			[-1.5, 1.5]
		],
		offsets: [
			[0, 1],
			[0, -1],
			[0, -2],
			[-1, 0]
		],
		centerOffset: [-0.5, -0.5],
		rotations: 0,
		flip: 0
	},
	Z: {
		letter: 'Z',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
		texture: null,
		cornerVertices: [
			[-1, 2],
			[1, 2],
			[1, 0],
			[2, 0],
			[2, -1],
			[0, -1],
			[0, 1],
			[-1, 1],
			[-1, 2]
		],
		offsets: [
			[0, -1],
			[0, 1],
			[-1, 1],
			[1, -1]
		],
		centerOffset: [0, 0],
		rotations: 0,
		flip: 0
	}
};
