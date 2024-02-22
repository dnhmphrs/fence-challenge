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
		]
	},
	I: {
		letter: 'I',
		width: 1,
		height: 5,
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
		]
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
		]
	},
	N: {
		letter: 'N',
		width: 4,
		height: 2,
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
		]
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
		]
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
		]
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
		]
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
		]
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
		]
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
		]
	},
	Y: {
		letter: 'Y',
		width: 4,
		height: 2,
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
		]
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
		]
	}
};
