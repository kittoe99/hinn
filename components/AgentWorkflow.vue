<template>
  <div class="workflow-wrapper">
    <div class="animation-container">
      <svg ref="svgRef" id="workflow-svg" class="workflow-svg" viewBox="0 0 1000 500">
        <defs>
          <g id="icon-email" transform="scale(1.6)">
            <path d="M-15,-10 L15,-10 L15,10 L-15,10 Z M-15,-10 L0,2 L15,-10" />
          </g>
          <g id="icon-knowledge" transform="scale(1.6)">
            <path d="M-2, -15 L-15, -15 L-15, 15 L-2, 15 M-2,-15 L15,-12 L15,18 L-2,15 Z" />
          </g>
          <g id="icon-agent" transform="scale(1.6)">
            <path d="M-12,-10 a12,12 0 0,1 24,0 v10 H-12 Z M-5,-2 h2 M5,-2 h2 M-10,8 a10,10 0 0,0 20,0" />
          </g>
          <g id="icon-gmail" transform="scale(1.6)">
            <path d="M-15,-10 L15,-10 L15,10 L-15,10 Z M-15,-10 L0,2 L15,-10" />
          </g>
          <g id="icon-jira" transform="scale(1.6)">
            <path d="M-15,-12 L15,-12 L15,12 L-15,12 Z M-15,0 L15,0" stroke-dasharray="4 2" />
          </g>
          <g id="icon-crm" transform="scale(1.6)">
            <path d="M0,-8 a4,4 0 1,1 0,8 a4,4 0 1,1 0,-8 M-12,12 a12,8 0 0,1 24,0 Z" />
          </g>
        </defs>

        <path id="path-1" class="connection-path" d="M180 250 H 280" />
        <path id="path-2" class="connection-path" d="M380 250 C 430 250, 430 130, 480 130" />
        <path id="path-3" class="connection-path" d="M480 130 C 430 130, 430 250, 380 250" />
        <path id="path-4" class="connection-path" d="M380 250 H 700" />
        <path id="path-5" class="connection-path" d="M700 250 C 730 250, 750 150, 780 150" />
        <path id="path-6" class="connection-path" d="M700 250 H 780" />
        <path id="path-7" class="connection-path" d="M700 250 C 730 250, 750 350, 780 350" />

        <g id="email-trigger" class="node-group" transform="translate(60, 200)">
          <rect class="node-rect" width="120" height="100" />
          <use href="#icon-email" class="node-icon" x="60" y="35" />
          <text class="node-label" x="60" y="70">Customer</text>
          <text class="node-sublabel" x="60" y="87">Email</text>
        </g>

        <g id="agent-node" class="node-group" transform="translate(280, 200)">
          <rect class="node-rect" width="100" height="100" />
          <use href="#icon-agent" class="node-icon" x="50" y="35" />
          <text class="node-label" x="50" y="70">AI Agent</text>
          <text class="node-sublabel" x="50" y="87">Triage</text>
        </g>

        <g id="knowledge-node" class="node-group" transform="translate(480, 80)">
          <rect class="node-rect" width="130" height="100" />
          <use href="#icon-knowledge" class="node-icon" x="65" y="35" />
          <text class="node-label" x="65" y="70">Knowledge Base</text>
          <text class="node-sublabel" x="65" y="87">Search</text>
        </g>

        <g id="gmail-node" class="node-group" transform="translate(780, 100)">
          <rect class="node-rect" width="140" height="100" />
          <use href="#icon-gmail" class="node-icon" x="70" y="35" />
          <text class="node-label" x="70" y="70">GMail</text>
          <text class="node-sublabel" x="70" y="87">Draft Reply</text>
        </g>

        <g id="jira-node" class="node-group" transform="translate(780, 200)">
          <rect class="node-rect" width="140" height="100" />
          <use href="#icon-jira" class="node-icon" x="70" y="35" />
          <text class="node-label" x="70" y="70">Jira</text>
          <text class="node-sublabel" x="70" y="87">Escalate Ticket</text>
        </g>

        <g id="crm-node" class="node-group" transform="translate(780, 300)">
          <rect class="node-rect" width="140" height="100" />
          <use href="#icon-crm" class="node-icon" x="70" y="35" />
          <text class="node-label" x="70" y="70">CRM</text>
          <text class="node-sublabel" x="70" y="87">Log Interaction</text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const svgRef = ref(null)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let stopped = false

onMounted(() => {
  const svg = svgRef.value
  if (!svg) return

  const namespace = 'http://www.w3.org/2000/svg'

  const nodes = {
    trigger: svg.querySelector('#email-trigger'),
    agent: svg.querySelector('#agent-node'),
    knowledge: svg.querySelector('#knowledge-node'),
    gmail: svg.querySelector('#gmail-node'),
    jira: svg.querySelector('#jira-node'),
    crm: svg.querySelector('#crm-node')
  }

  const paths = {
    p1: svg.querySelector('#path-1'),
    p2: svg.querySelector('#path-2'),
    p3: svg.querySelector('#path-3'),
    p4: svg.querySelector('#path-4'),
    p5: svg.querySelector('#path-5'),
    p6: svg.querySelector('#path-6'),
    p7: svg.querySelector('#path-7')
  }

  const animatePulse = (pathElement, color, duration = 1000) => {
    if (!pathElement || stopped) return

    const pulseDot = document.createElementNS(namespace, 'circle')
    pulseDot.setAttribute('r', '6')
    pulseDot.setAttribute('fill', color)
    pulseDot.classList.add('pulse-dot')
    svg.appendChild(pulseDot)

    pulseDot.style.offsetPath = `path('${pathElement.getAttribute('d')}')`

    const animation = pulseDot.animate(
      [
        { offsetDistance: '0%', opacity: 1, transform: 'scale(1)' },
        { offsetDistance: '50%', opacity: 1, transform: 'scale(1.1)' },
        { offsetDistance: '100%', opacity: 1, transform: 'scale(1)' }
      ],
      {
        duration,
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    )

    animation.onfinish = () => {
      if (svg.contains(pulseDot)) {
        svg.removeChild(pulseDot)
      }
    }
  }

  const setActive = (node, active) => {
    if (!node) return
    node.classList.toggle('active', active)
  }

  const resetNodes = () => {
    Object.values(nodes).forEach((node) => setActive(node, false))
  }

  const runWorkflow = async () => {
    while (!stopped) {
      resetNodes()
      await sleep(2000)
      if (stopped) break

      setActive(nodes.trigger, true)
      animatePulse(paths.p1, 'var(--email-color)', 800)
      await sleep(800)
      if (stopped) break

      setActive(nodes.trigger, false)
      setActive(nodes.agent, true)
      await sleep(500)
      if (stopped) break

      animatePulse(paths.p2, 'var(--agent-color)', 1000)
      await sleep(1000)
      if (stopped) break

      setActive(nodes.knowledge, true)
      await sleep(1500)
      if (stopped) break

      animatePulse(paths.p3, 'var(--knowledge-color)', 1000)
      setActive(nodes.knowledge, false)
      await sleep(1000)
      if (stopped) break

      await sleep(1000)
      if (stopped) break

      animatePulse(paths.p5, 'var(--agent-color)', 1000)
      animatePulse(paths.p6, 'var(--agent-color)', 1000)
      animatePulse(paths.p7, 'var(--agent-color)', 1000)
      await sleep(1000)
      if (stopped) break

      setActive(nodes.gmail, true)
      setActive(nodes.jira, true)
      setActive(nodes.crm, true)
      await sleep(2500)
      if (stopped) break

      setActive(nodes.gmail, false)
      setActive(nodes.jira, false)
      setActive(nodes.crm, false)
      setActive(nodes.agent, false)
    }
  }

  runWorkflow()
})

onBeforeUnmount(() => {
  stopped = true
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

:root {
  --bg-color: #121212;
  --dot-color: #2A2A2A;
  --node-bg: #1F1F1F;
  --node-stroke: #444444;
  --node-text: #E0E0E0;
  --sublabel-text: #A0A0A0;
  --line-color: #666666;
  --email-color: #4285F4;
  --knowledge-color: #C1C1C1;
  --agent-color: #8E44AD;
  --gmail-color: #EA4335;
  --jira-color: #0052CC;
  --crm-color: #FF5733;
}

.workflow-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--node-text);
}

.animation-container {
  width: 95%;
  max-width: 1100px;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid var(--node-stroke);
  background-color: var(--bg-color);
  background-image: radial-gradient(var(--dot-color) 1px, transparent 0);
  background-size: 25px 25px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.workflow-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.node-group {
  transition: transform 0.2s ease-out;
}

.node-group:hover {
  transform: none;
}

.node-rect {
  fill: var(--node-bg);
  stroke: var(--node-stroke);
  stroke-width: 1.5px;
  rx: 10;
  ry: 10;
  transition: stroke 0.3s ease, fill 0.3s ease;
}

.node-group.active .node-rect {
  stroke-width: 3px;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
}

.node-icon {
  fill: none;
  stroke: #FFFFFF;
  stroke-width: 1.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.node-label {
  fill: var(--node-text);
  font-size: 16px;
  font-weight: 600;
  text-anchor: middle;
  letter-spacing: 0.5px;
}

.node-sublabel {
  fill: var(--sublabel-text);
  font-size: 12px;
  font-weight: 400;
  text-anchor: middle;
}

#email-trigger.active .node-rect {
  stroke: var(--email-color);
}

#knowledge-node.active .node-rect {
  stroke: var(--knowledge-color);
}

#agent-node.active .node-rect {
  stroke: var(--agent-color);
}

#gmail-node.active .node-rect {
  stroke: var(--gmail-color);
}

#jira-node.active .node-rect {
  stroke: var(--jira-color);
}

#crm-node.active .node-rect {
  stroke: var(--crm-color);
}

.connection-path {
  fill: none;
  stroke: var(--line-color);
  stroke-width: 2px;
  stroke-linejoin: round;
}

.pulse-dot {
  opacity: 0;
}
</style>
