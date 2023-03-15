// @ts-ignore
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { api } from "@/services/api";
import { withSSRSig } from "@/utils/withSSRSig";
import {
  Flex,
  Image,
  Wrap,
  WrapItem,
  Text,
  Button,
  Spacer,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { RiDownload2Fill, RiDeleteBin2Fill } from "react-icons/ri";
import Modal from "react-modal";
import { ModalIMportImage } from "./ModalImportImage";
import { ModalDelivery } from "./ModalDelivery";

export default function Galeria() {
  const [imgsUser, setimgsUser] = useState([]);
  const [importModalImage, setImportModalImage] = useState(false);
  const [deliverytModal, setDeliveryModal] = useState(false);
  const [imgsPrint, setimgsPrint] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    api.get("/file").then((response) => {
      console.log("ibagens", response.data);
      setimgsUser(response.data);
    });
  }, []);

  function handleOpenImportModalImage() {
    setImportModalImage(true);
  }

  function handleCloseImportModalImage() {
    setImportModalImage(false);
  }

  function handleOpenDeliveryModal() {
    deliveryImages();
    setDeliveryModal(true);
  }

  function handleCloseDeliveryModal() {
    setDeliveryModal(false);
  }

  const limit_factor = 3;
  const delivered = 2;

  const limit_photos = 10;
  const photos = imgsUser.length;

  function downloadImage(image) {
    console.log("image");
    saveAs(image.url, image.name);
  }

  async function deleteImage(image) {
    console.log("Deletar Imagem", image);
    await api.get("/file/" + image).then((res) => {
      console.log(res.data);
      window.location.reload();
    });
  }

  async function deliveryImages() {
    await api.get("/print").then((res) => {
      setimgsPrint(res.data);
    });
  }

  return (
    <Flex direction="column" h="100vh" overflow="hidden">
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="2">
        <Sidebar />
        <Flex as="div" direction="column" w="100%" h="100%" gap="4">
          <Flex>
            <Heading>GALERIA</Heading>
            <Spacer />
            <Flex gap="4">
              <Button
                colorScheme="blue"
                isDisabled={!(limit_photos - photos > 0)}
                onClick={handleOpenImportModalImage}
              >
                Importar
              </Button>
              <Button
                colorScheme="green"
                isDisabled={!(limit_factor - delivered > 0)}
                onClick={handleOpenDeliveryModal}
              >
                Produzir
              </Button>
            </Flex>
          </Flex>
          <Wrap
            align="center"
            justify="center"
            spacing="6"
            p="2"
            overflowY="auto"
          >
            {imgsUser.map((image, key) => {
              return (
                <Flex
                  as="div"
                  direction="column"
                  key={key}
                  width="150px"
                  bg="white"
                  p="8"
                  boxShadow="lg"
                  align="center"
                >
                  <WrapItem opacity={image.printed ? "30%" : ""} w="100px">
                    <Flex direction="column">
                      <Image
                        boxSize="100px"
                        objectFit="cover"
                        src={image.url}
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                      <Flex mt="2">
                        <Text hidden>{image.name}</Text>
                        <Spacer />
                        <Button
                          colorScheme="blue"
                          variant="solid"
                          onClick={() => {
                            downloadImage(image);
                          }}
                        >
                          <Icon as={RiDownload2Fill} font="16" />
                        </Button>
                        <Button
                          ml="2"
                          colorScheme="red"
                          variant="solid"
                          onClick={() => {
                            deleteImage(image.id);
                          }}
                        >
                          <Icon as={RiDeleteBin2Fill} font="16" />
                        </Button>
                      </Flex>
                    </Flex>
                  </WrapItem>
                </Flex>
              );
            })}
          </Wrap>
        </Flex>
      </Flex>

      <ModalIMportImage
        isOpen={importModalImage}
        onRequestClose={handleCloseImportModalImage}
      />
      <ModalDelivery
        images={imgsPrint}
        isOpen={deliverytModal}
        onRequestClose={handleCloseDeliveryModal}
      />
    </Flex>
  );
}

export const getServerSideProps = withSSRSig(async (ctx) => {
  return {
    props: {},
  };
});
