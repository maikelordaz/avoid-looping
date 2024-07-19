// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

contract UnboundLoop {
    uint256[47486] public s_hugeArray;

    error IndexOutOfBounds(uint256 index, uint256 maxLength);

    /// @notice Fills the data array with a sequence of numbers
    /// @param x initial index to start filling the data array
    /// @param y the number of elements to fill in the data array
    function fill(uint256 x, uint256 y) public {
        uint256 hugeArrayLength = s_hugeArray.length;

        require(
            x < hugeArrayLength - 1 && y <= hugeArrayLength - x,
            IndexOutOfBounds(x, hugeArrayLength)
        );

        uint256 valueToStore;

        if (x != 0) {
            valueToStore = ++s_hugeArray[x - 1];
        }

        for (uint256 i = x; i < x + y; ) {
            s_hugeArray[i] = valueToStore;

            unchecked {
                ++valueToStore;
                ++i;
            }
        }
    }

    // Return the sum of the data array with a simple loop
    function sum() public view returns (uint256 s) {
        uint256 hugeArrayLength = s_hugeArray.length;

        for (uint256 i; i < hugeArrayLength; i++) {
            s += s_hugeArray[i];
        }
    }

    // Return the array length
    function getArrayLength() public view returns (uint256) {
        return s_hugeArray.length;
    }
}
