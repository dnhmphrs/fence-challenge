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

export var pentominosDict = {
	F: {
		letter: 'F',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
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
			[0,1],
			[1,1],
			[-1,0],
			[0,-1]
		],
		centerOffset: [0,0]
	},
	I: {
		letter: 'I',
		width: 5,
		height: 1,
		gridPosition: { x: null, y: null },
		cornerVertices: [
			[0, 3],
			[1, 3],
			[1, -2],
			[0, -2],
			[0, 3]
		],
		offsets: [
			[-2,0],
			[-1,0],
			[1,0],
			[2,0]
		],
		centerOffset: [0,0]
	},
	L: {
		letter: 'L',
		width: 2,
		height: 4,
		gridPosition: { x: null, y: null },
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
			[0,2],
			[0,1],
			[0,-1],
			[1,-1]
		],
		centerOffset: [.5,.5]

	},
	N: {
		letter: 'N',
		width: 2,
		height: 4,
		gridPosition: { x: null, y: null },
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
			[1,1],
			[1,0],
			[0,-1],
			[0,-2]
		],
		centerOffset: [.5,-.5]
	},
	P: {
		letter: 'P',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
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
			[0,1],
			[1,1],
			[1,0],
			[0,-1]
		],
		centerOffset: [1,0]
	},
	T: {
		letter: 'T',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
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
			[-1,0],
			[1,0],
			[0,-1],
			[0,-2]
		],
		centerOffset: [0,-1]
	},
	U: {
		letter: 'U',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
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
			[-1,0],
			[-1,1],
			[1,0],
			[1,1]
		],
		centerOffset: [0,1]
	},
	V: {
		letter: 'V',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
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
			[0,1],
			[0,2],
			[1,0],
			[2,0]
		],
		centerOffset: [1,1]
	},
	W: {
		letter: 'W',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
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
			[-1,0],
			[-1,1],
			[0,-1],
			[1,-1]
		],
		centerOffset: [0,0]
	},
	X: {
		letter: 'X',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
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
			[0,1],
			[0,-1],
			[1,0],
			[-1,0]
		],
		centerOffset: [0,0]
	},
	Y: {
		letter: 'Y',
		width: 2,
		height: 4,
		gridPosition: { x: null, y: null },
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
			[0,1],
			[0,-1],
			[0,-2],
			[-1,0]
		],
		centerOffset: [-.5,-.5]
	},
	Z: {
		letter: 'Z',
		width: 3,
		height: 3,
		gridPosition: { x: null, y: null },
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
			[0,-1],
			[0,1],
			[-1,1],
			[1,-1]
		],
		centerOffset: [0,0]
	}
};
