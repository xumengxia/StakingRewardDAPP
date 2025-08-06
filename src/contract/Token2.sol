// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token2 is ERC20 {
    // 部署时执行：初始化代币名称、符号，并给部署者 mint 初始币
    constructor(uint256 initialSupply) ERC20("G0ld2", "GLD2") {
        _mint(msg.sender, initialSupply);
    }

    // 公开增发函数：任何人都能调用，给 `to` 地址 mint `amount` 代币（危险！实际需加权限）
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
