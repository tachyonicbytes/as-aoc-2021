#!/usr/bin/env python3

import numpy as np

data = open("days/9/input.txt", "r", encoding="utf-8").read()
df = np.array([list(map(int, [c for c in line])) for line in data.splitlines()])
pad = np.pad(df, ((1, 1), (1, 1)), "constant", constant_values=10)
mask = (
    (df < pad[1:-1, 0:-2]).astype(int)  # left
    + (df < pad[1:-1, 2:]).astype(int)  # right
    + (df < pad[0:-2, 1:-1]).astype(int)  # top
    + (df < pad[2:, 1:-1]).astype(int)  # bottom
)
print((df)[mask == 4])
