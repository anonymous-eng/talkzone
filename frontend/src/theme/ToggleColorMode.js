import { Button } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/color-mode";
import { useColorModeValue } from '@chakra-ui/react';


const ToggleColorMode = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('gray.200', 'blue.500');

    return (
        <Button
            onClick={() => toggleColorMode()}
            bg={bg}
            _hover={{}}
        >
        {colorMode === "dark" ? (
            <SunIcon color="orange.1000" />
        ) : (
            <MoonIcon color="blue.1000" />
        )}
        </Button>
    );
};

export default ToggleColorMode;