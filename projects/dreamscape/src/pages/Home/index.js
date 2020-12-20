import React from 'react';

import {
  List,
  Container,
  Thumbnail,
  Title,
  Post,
  Description,
  Button,
  Back,
  Modal,
  ModalFooter,
  ExitButton,
} from './styles';

export default function Home() {
  return (
    <>
      <List>
        <li>
          <Container>
            <Thumbnail>
              <iframe
                src="https://www.youtube.com/embed/ySzrJ4GRF7s"
                frameBorder="0"
                allowFullScreen
              />
            </Thumbnail>

            <Title>Soundgarden - Fell On Black Days</Title>
            <Post>Publicado em 21 de abr de 2010</Post>
            <span />
            <Description>
              <Button>
                Mais{' '}
                <Back>
                  <Modal>
                    <p>Why do we use it?</p>
                    <span />
                    <p>
                      Why do we use it? It is a long established fact that a
                      reader will be distracted by the readable content of a
                      page when looking at its layout. The point of using Lorem
                      Ipsum is that it has a more-or-less normal distribution of
                      letters, as opposed to using 'Content here, content here',
                      making it look like readable English. Many desktop
                      publishing packages and web page editors now use Lorem
                      Ipsum as their default model text, and a search for 'lorem
                      ipsum' will uncover many web sites still in their infancy.
                      Various versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).
                    </p>
                    <span />
                    <ModalFooter>
                      <ExitButton>X</ExitButton>
                    </ModalFooter>
                  </Modal>
                </Back>
              </Button>
            </Description>
          </Container>
        </li>
        <li>
          <Container>
            <Thumbnail>
              <iframe
                src="https://www.youtube.com/embed/zcsE9ObDPxA"
                frameBorder="0"
                allowFullScreen
              />
            </Thumbnail>

            <Title>Dio - Rainbow In The Dark</Title>
            <Post>Publicado 05 de jan de 2017</Post>
            <span />
            <Description>
              <Button>
                Mais{' '}
                <Back>
                  <Modal>
                    <p>Dio - Rainbow In The Dark</p>
                    <span />
                    <p>
                      Why do we use it? It is a long established fact that a
                      reader will be distracted by the readable content of a
                      page when looking at its layout. The point of using Lorem
                      Ipsum is that it has a more-or-less normal distribution of
                      letters, as opposed to using 'Content here, content here',
                      making it look like readable English. Many desktop
                      publishing packages and web page editors now use Lorem
                      Ipsum as their default model text, and a search for 'lorem
                      ipsum' will uncover many web sites still in their infancy.
                      Various versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).
                    </p>
                    <span />
                    <ModalFooter>
                      <ExitButton>X</ExitButton>
                    </ModalFooter>
                  </Modal>
                </Back>
              </Button>
            </Description>
          </Container>
        </li>
        <li>
          <Container>
            <Thumbnail>
              <iframe
                src="https://www.youtube.com/embed/WxnN05vOuSM"
                frameBorder="0"
                allowFullScreen
              />
            </Thumbnail>

            <Title>Iron Maiden - The Number Of The Beast</Title>
            <Post>Publicado 05 de ago de 2015</Post>
            <span />
            <Description>
              <Button>
                Mais{' '}
                <Back>
                  <Modal>
                    <p>Iron Maiden - The Number Of The Beast</p>
                    <span />
                    <p>
                      Why do we use it? It is a long established fact that a
                      reader will be distracted by the readable content of a
                      page when looking at its layout. The point of using Lorem
                      Ipsum is that it has a more-or-less normal distribution of
                      letters, as opposed to using 'Content here, content here',
                      making it look like readable English. Many desktop
                      publishing packages and web page editors now use Lorem
                      Ipsum as their default model text, and a search for 'lorem
                      ipsum' will uncover many web sites still in their infancy.
                      Various versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).
                    </p>
                    <span />
                    <ModalFooter>
                      <ExitButton>X</ExitButton>
                    </ModalFooter>
                  </Modal>
                </Back>
              </Button>
            </Description>
          </Container>
        </li>
        <li>
          <Container>
            <Thumbnail>
              <iframe
                src="https://www.youtube.com/embed/mEkXyEIu3OU"
                frameBorder="0"
                allowFullScreen
              />
            </Thumbnail>

            <Title>Megadeth - Post American World</Title>
            <Post>Publicado 19 de jUL de 2016</Post>
            <span />
            <Description>
              <Button>
                Mais{' '}
                <Back>
                  <Modal>
                    <p>Megadeth - Post American World</p>
                    <span />
                    <p>
                      Why do we use it? It is a long established fact that a
                      reader will be distracted by the readable content of a
                      page when looking at its layout. The point of using Lorem
                      Ipsum is that it has a more-or-less normal distribution of
                      letters, as opposed to using 'Content here, content here',
                      making it look like readable English. Many desktop
                      publishing packages and web page editors now use Lorem
                      Ipsum as their default model text, and a search for 'lorem
                      ipsum' will uncover many web sites still in their infancy.
                      Various versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).
                    </p>
                    <span />
                    <ModalFooter>
                      <ExitButton>X</ExitButton>
                    </ModalFooter>
                  </Modal>
                </Back>
              </Button>
            </Description>
          </Container>
        </li>
      </List>
    </>
  );
}
