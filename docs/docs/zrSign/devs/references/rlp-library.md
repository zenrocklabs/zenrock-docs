---
title: RLP Library
sidebar_position: 2
---

# Lib_RLPWriter Library

The `Lib_RLPWriter` library is a Solidity utility for RLP (Recursive Length Prefix) encoding. RLP is the main encoding method used to serialize objects in Ethereum. The purpose of RLP is to encode arbitrarily nested arrays of binary data, and it is used for most of the heavy lifting in Ethereum, including but not limited to, encoding transactions and blocks.

This library provides a collection of functions to help you perform RLP encoding for various data types, including byte strings, lists of byte strings, strings, addresses, uint256, and booleans.

## Functions

### writeBytes(bytes memory _in)

This function RLP encodes a byte string. If the byte string is of length 1 and the value of the single byte is less than 128, it returns the byte string as it is. Otherwise, it encodes the byte string according to the RLP encoding rules.

### writeList(bytes[] memory _in)

This function RLP encodes a list of RLP encoded byte strings. It first flattens the list of byte strings into a single byte string, and then encodes the flattened byte string according to the RLP encoding rules.

### writeString(string memory _in)

This function RLP encodes a string. It first converts the string into a byte string, and then RLP encodes the byte string.

### writeAddress(address _in)

This function RLP encodes an address. It first converts the address into a byte string using ABI encoding, and then RLP encodes the byte string.

### writeUint(uint256 _in)

This function RLP encodes a uint256. It first converts the uint256 into a byte string in big endian binary form with no leading zeroes, and then RLP encodes the byte string.

### writeBool(bool _in)

This function RLP encodes a bool. If the bool is true, it encodes it as 0x01. If the bool is false, it encodes it as 0x80.

## Private Functions

The `Lib_RLPWriter` library also includes several private functions that are utilized by the public functions for the RLP encoding process.

### _writeLength(uint256 _len, uint256 _offset)

This function encodes the first byte, followed by the len in binary form if length is more than 55. The `_offset` is 128 if the item is a string, and 192 if the item is a list.

### _toBinary(uint256 _x)

This function encodes an integer in big endian binary form with no leading zeroes. This function is primarily used by `writeUint(uint256 _in)` to convert a uint256 into a byte string before RLP encoding.

### _memcpy(uint256 _dest, uint256 _src, uint256 _len)

This function is a utility function used to copy a piece of memory to another location. It's used in the `_flatten(bytes[] memory _list)` function to copy byte strings into the flattened byte string.

### _flatten(bytes[] memory _list)

This function flattens a list of byte strings into a single byte string. It's primarily used by `writeList(bytes[] memory _in)` to flatten the list of byte strings before RLP encoding.

## Usage of Lib_RLPWriter Library

The `Lib_RLPWriter` library will be utilized in our smart contract to handle the RLP encoding of various data types. This is crucial for ensuring the correct serialization of data when interacting with other parts of the Ethereum ecosystem.

For instance, when our smart contract needs to create and broadcast a new transaction, the transaction data will need to be RLP encoded before it can be sent. This is where the `writeList(bytes[] memory _in)` function of the `Lib_RLPWriter` library can be used. It will take a list of byte strings (representing the various parts of the transaction) and encode it into a single byte string that can be included in a transaction.

Similarly, if we need to encode a specific Ethereum address or a boolean value as part of our smart contract's operations, we can use the `writeAddress(address _in)` and `writeBool(bool _in)` functions respectively.

Overall, the `Lib_RLPWriter` library provides the necessary tools for RLP encoding, ensuring our smart contract's compatibility with Ethereum's data serialization standard.

## Full code

```solidity
library Lib_RLPWriter {
    /**********************
     * Internal Functions *
     **********************/

    /**
     * RLP encodes a byte string.
     * @param _in The byte string to encode.
     * @return The RLP encoded string in bytes.
     */
    function writeBytes(bytes memory _in) internal pure returns (bytes memory) {
        bytes memory encoded;

        if (_in.length == 1 && uint8(_in[0]) < 128) {
            encoded = _in;
        } else {
            encoded = abi.encodePacked(_writeLength(_in.length, 128), _in);
        }

        return encoded;
    }

    /**
     * RLP encodes a list of RLP encoded byte byte strings.
     * @param _in The list of RLP encoded byte strings.
     * @return The RLP encoded list of items in bytes.
     */
    function writeList(bytes[] memory _in) internal pure returns (bytes memory) {
        bytes memory list = _flatten(_in);
        return abi.encodePacked(_writeLength(list.length, 192), list);
    }

    /**
     * RLP encodes a string.
     * @param _in The string to encode.
     * @return The RLP encoded string in bytes.
     */
    function writeString(string memory _in) internal pure returns (bytes memory) {
        return writeBytes(bytes(_in));
    }

    /**
     * RLP encodes an address.
     * @param _in The address to encode.
     * @return The RLP encoded address in bytes.
     */
    function writeAddress(address _in) internal pure returns (bytes memory) {
        return writeBytes(abi.encodePacked(_in));
    }

    /**
     * RLP encodes a uint.
     * @param _in The uint256 to encode.
     * @return The RLP encoded uint256 in bytes.
     */
    function writeUint(uint256 _in) internal pure returns (bytes memory) {
        return writeBytes(_toBinary(_in));
    }

    /**
     * RLP encodes a bool.
     * @param _in The bool to encode.
     * @return The RLP encoded bool in bytes.
     */
    function writeBool(bool _in) internal pure returns (bytes memory) {
        bytes memory encoded = new bytes(1);
        encoded[0] = (_in ? bytes1(0x01) : bytes1(0x80));
        return encoded;
    }

    /*********************
     * Private Functions *
     *********************/

    /**
     * Encode the first byte, followed by the `len` in binary form if `length` is more than 55.
     * @param _len The length of the string or the payload.
     * @param _offset 128 if item is string, 192 if item is list.
     * @return RLP encoded bytes.
     */
    function _writeLength(uint256 _len, uint256 _offset) private pure returns (bytes memory) {
        bytes memory encoded;

        if (_len < 56) {
            encoded = new bytes(1);
            encoded[0] = bytes1(uint8(_len) + uint8(_offset));
        } else {
            uint256 lenLen;
            uint256 i = 1;
            while (_len / i != 0) {
                lenLen++;
                i *= 256;
            }

            encoded = new bytes(lenLen + 1);
            encoded[0] = bytes1(uint8(lenLen) + uint8(_offset) + 55);
            for (i = 1; i <= lenLen; i++) {
                encoded[i] = bytes1(uint8((_len / (256**(lenLen - i))) % 256));
            }
        }

        return encoded;
    }

    /**
     * Encode integer in big endian binary form with no leading zeroes.
     * @notice TODO: This should be optimized with assembly to save gas costs.
     * @param _x The integer to encode.
     * @return RLP encoded bytes.
     */
    function _toBinary(uint256 _x) internal pure returns (bytes memory) {
        bytes memory b = abi.encodePacked(_x);

        uint256 i = 0;
        for (; i < 32; i++) {
            if (b[i] != 0) {
                break;
            }
        }

        bytes memory res = new bytes(32 - i);
        for (uint256 j = 0; j < res.length; j++) {
            res[j] = b[i++];
        }

        return res;
    }

    /**
     * Copies a piece of memory to another location.
     * @notice From: https://github.com/Arachnid/solidity-stringutils/blob/master/src/strings.sol.
     * @param _dest Destination location.
     * @param _src Source location.
     * @param _len Length of memory to copy.
     */
    function _memcpy(
        uint256 _dest,
        uint256 _src,
        uint256 _len
    ) private pure {
        uint256 dest = _dest;
        uint256 src = _src;
        uint256 len = _len;

        for (; len >= 32; len -= 32) {
            assembly {
                mstore(dest, mload(src))
            }
            dest += 32;
            src += 32;
        }

        uint256 mask;
        unchecked {
            mask = 256**(32 - len) - 1;
        }
        assembly {
            let srcpart := and(mload(src), not(mask))
            let destpart := and(mload(dest), mask)
            mstore(dest, or(destpart, srcpart))
        }
    }

    /**
     * Flattens a list of byte strings into one byte string.
     * @notice From: https://github.com/sammayo/solidity-rlp-encoder/blob/master/RLPEncode.sol.
     * @param _list List of byte strings to flatten.
     * @return The flattened byte string.
     */
    function _flatten(bytes[] memory _list) private pure returns (bytes memory) {
        if (_list.length == 0) {
            return new bytes(0);
        }

        uint256 len;
        uint256 i = 0;
        for (; i < _list.length; i++) {
            len += _list[i].length;
        }

        bytes memory flattened = new bytes(len);
        uint256 flattenedPtr;
        assembly {
            flattenedPtr := add(flattened, 0x20)
        }

        for (i = 0; i < _list.length; i++) {
            bytes memory item = _list[i];

            uint256 listPtr;
            assembly {
                listPtr := add(item, 0x20)
            }

            _memcpy(flattenedPtr, listPtr, item.length);
            flattenedPtr += _list[i].length;
        }

        return flattened;
    }
}
```