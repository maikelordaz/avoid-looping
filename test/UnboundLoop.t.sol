// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import {Test, console2} from "forge-std/Test.sol";
import {UnboundLoop} from "src/UnboundLoop.sol";

contract UnboundLoopTest is Test {
    UnboundLoop unboundLoop;

    function setUp() public {
        unboundLoop = new UnboundLoop();
    }

    function testFill() public {
        uint256 gasStart = gasleft();
        unboundLoop.fill(0, 47486);

        console2.log("First element", unboundLoop.s_hugeArray(0));
        console2.log("Last element", unboundLoop.s_hugeArray(47485));
        console2.log("");

        uint256 gasEnd = gasleft();
        uint256 gasUsed = gasStart - gasEnd;

        console2.log("gasStart", gasStart); // 1_073_720_506
        console2.log("gasEnd", gasEnd); // 16_785_420
        console2.log("gasUsed", gasUsed); // 1_056_934_354
    }

    modifier fillUp() {
        unboundLoop.fill(0, 47485);
        _;
    }

    function testSum() public fillUp {
        uint256 gasStart = gasleft();

        uint256 sum = unboundLoop.sum();
        console2.log("Sum", sum); // 1_127_388_870

        uint256 gasEnd = gasleft();
        uint256 gasUsed = gasStart - gasEnd;

        console2.log("gasStart", gasStart); // 16_813_746
        console2.log("gasEnd", gasEnd); // 6_550_804
        console2.log("gasUsed", gasUsed); // 10_262_942
    }
}
