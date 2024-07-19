// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import {Script, console2} from "forge-std/Script.sol";
import {UnboundLoop} from "src/UnboundLoop.sol";
import {ComputationConsumer} from "src/ComputationConsumer.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployContracts is Script {
    function deployContracts() public returns (UnboundLoop, ComputationConsumer, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig();
        address router = helperConfig.getConfigByChainId(block.chainid).router;

        vm.startBroadcast();
        UnboundLoop unboundLoop = new UnboundLoop();
        ComputationConsumer computationConsumer = new ComputationConsumer(router);
        vm.stopBroadcast();

        return (unboundLoop, computationConsumer, helperConfig);
    }

    function run() external returns (UnboundLoop, ComputationConsumer, HelperConfig) {
        return deployContracts();
    }
}
