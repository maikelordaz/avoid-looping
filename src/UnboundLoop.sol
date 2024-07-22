// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

contract UnboundLoop {
    mapping(uint256 index => uint256 value) public s_hugeMapping;
    uint256 public indexId;

    function fill(uint256 indexToStart, uint256 indexToEnd) public {
        uint256 valueToStore = indexToStart;

        for (uint256 i = indexToStart; i < indexToStart + indexToEnd; i++) {
            s_hugeMapping[i] = valueToStore;

            ++valueToStore;
        }

        indexId = valueToStore;
    }

    function sum() public view returns (uint256 s) {
        for (uint256 i; i < indexId; i++) {
            s += s_hugeMapping[i];
        }
    }
}
