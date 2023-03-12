import { CloseButton, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import Modal from 'react-modal';



interface ModalImportImageProps {
  isOpen: boolean;
  onRequestClose: () => void;
}


export function ModalTermo({ isOpen, onRequestClose,images }: ModalImportImageProps) {
 


  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} >
      <Flex as="div" direction="column" h="100%">
        <Flex h="8" w="100%" justifyContent="right">
          <CloseButton onClick={onRequestClose} />
        </Flex>
        <Flex h="100%" w="100%" direction="column"  gap="8" p="8">
            <Text>"Olá,</Text>
                <Text>Primeiramente queremos dizer que estamos muito felizes de você ter nos escolhido para fazer um quadro vivo com os melhores momentos de sua vida.
                Agora não somente fotos do passado, mas também as próximas poderão ser aproveitadas em continua geração de artes e atualização do seu quadro com o que você quer lembrar e assim sentir de novo os seus melhores pensamentos e sentimentos.
                Abaixo está o seu link de acesso para o seu editor de plano de assinatura.
                xxxx</Text>
                <Text>Lembre-se de importar fotos para o seu editor e também marcar as que você deseja enviar para elaboração da arte do seu quadro pela Lifewall.
                Atente na seleção das fotos para produção para enviar as quantidades de fotos existentes no formato de quadro escolhido inicialmente por você.</Text>
                <UnorderedList>
                    <ListItem>Quadrado: 1, 4, 8, 9, 10 ou 13 fotos.</ListItem>
                <ListItem>Vertical: 1, 4, 7, 8, 9 e 13 fotos.</ListItem>
                <ListItem>Horizontal: 1, 4, 6, 8 e 13 fotos.</ListItem>
                </UnorderedList>
                <Text>Marque as fotos para produção da arte conforme a frequência do seu plano contratado. Após o quinto dia útil do mês subsequente do seu plano de assinatura escolhido a Lifewall irá fazer sorteio das fotos e criação e envio da arte para você.
                Temos certeza que você e sua família irão curtir de mais ter na parede seus melhores momentos sempre atualizados.</Text>
                <Text as="b">Equipe Lifewall”</Text>

        </Flex>

      </Flex>
    </Modal>
  );
}