<script setup lang="ts">
import type { Ref } from 'vue'
import type { TrizonePos } from './utility/TrizoneContainer.vue'
import { ref } from 'vue'
import nixIcon from '@/assets/icons/NixOS_logo.svg'
import gameImage from '@/assets/imgs/e3fb01e3ca09eb6aff3a600159bd02c3.jpg'
import GameEhibition from './GameEhibition.vue'
import Exhibition from './utility/Exhibition.vue'
import FlexCenterArea from './utility/FlexCenterArea.vue'
import TrizoneContainer from './utility/TrizoneContainer.vue'

withDefaults(defineProps<{ userName: string }>(), {})

const titlePos: Ref<TrizonePos> = ref('center')
const buttonPos: Ref<TrizonePos> = ref('center')
</script>

<template>
  <TrizoneContainer class="component-root-interact-title" :position="titlePos">
    <template #default>
      <div class="center">
        <div class="container">
          <span class="name">{{ userName }}</span>
          <TrizoneContainer :position="buttonPos">
            <template #default>
              <FlexCenterArea>
                <div class="button-container">
                  <div style="display: flex; align-items: center">
                    <span class="left-title">一个</span>
                  </div>
                  <div
                    style="
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              gap: 0.75rem;
            "
                  >
                    <p class="subtitle programer">
                      喜欢游戏的<button
                        style="--button-color: rgb(16 185 129 / 1)"
                        @click="titlePos = 'left'; buttonPos = 'right'"
                      >
                        程序员
                      </button>
                    </p>
                    <p class="subtitle player">
                      喜爱写程序的<button
                        style="--button-color: rgb(99 102 241 / 1)"
                        @click="titlePos = 'right'; buttonPos = 'left'"
                      >
                        玩家
                      </button>
                    </p>
                  </div>
                </div>
              </FlexCenterArea>
            </template>
          </TrizoneContainer>
        </div>
      </div>
    </template>
    <template #left>
      <div class="side-bar left-bar">
        <Exhibition :image="nixIcon" title="我正在学习" describtion="" />
      </div>
    </template>
    <template #right>
      <div class="side-bar right-bar">
        <GameEhibition :image="gameImage" title="我正在玩" describtion="《神界: 原罪2 - 终极版》" store-url="https://store.steampowered.com/app/435150/2" />
      </div>
    </template>
  </TrizoneContainer>
</template>

<style lang="css" scoped>
.component-root-interact-title {
  pointer-events: none;
}

.component-root-interact-title {
  .center {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .name {
      font-size: 5rem;
      font-weight: bold;
      display: block;
    }

    .container {
      margin: 0 2rem;
    }

    .button-container {
      pointer-events: initial;
      display: inline-flex;
      justify-content: center;
      gap: 1.5rem;

      .left-title {
        --title-color: rgba(196, 196, 196, 1);
        writing-mode: vertical-lr;
        font-size: 3.5rem;
        letter-spacing: 0.1em;
        line-height: 1;
        font-weight: 900;
        padding-right: 1rem;
        border-right-width: 1px;
        border-color: var(--title-color);
        border-right-style: solid;
        color: var(--title-color);
      }

      .subtitle {
        color: rgba(196, 196, 196, 1);
        font-size: 1.875rem;
        line-height: 2.25rem;
        font-weight: 300;
      }

      .subtitle button {
        padding: 0.25rem 0.65rem;
        margin-left: 0.5rem;
        border-radius: 0.25rem;
        transition: all 1s;
        background-color: var(--button-color);
        box-shadow: 0 0 0rem 0rem var(--button-color);
        border-color: var(--button-color);
        outline-color: var(--button-color);
      }

      .subtitle button:hover {
        box-shadow: 0 0 2rem 0.5rem var(--button-color);
      }

      .subtitle button:focus {
        outline: none;
      }
    }
  }

  .side-bar {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    > * {
      position: absolute;
      top: 50%;

      transition: all, 1s;
    }

    &.left-bar > * {
      transform: translate(50%, -50%);
      right: 20rem;
    }

    &.right-bar > * {
      transform: translate(-50%, -50%);
      left: 20rem;
    }
  }

  &.select-position-left .side-bar.left-bar > * {
    right: 50%;
  }

  &.select-position-right .side-bar.right-bar > * {
    left: 50%;
  }
}
</style>
