<template>
  <div class="workflow-wrapper">
    <div class="animation-container">
      <svg ref="svgRef" id="workflow-svg" class="workflow-svg" viewBox="0 0 1000 500">
        <defs>
          <g id="icon-email">
            <path d="M-16 6V-8c0-1.1.9-2 2-2h28c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H-14c-1.1 0-2-.9-2-2zm2-14v1.7l14 8.8 14-8.8V-8H-14z" />
          </g>
          <g id="icon-knowledge">
            <path d="M-14-12c-3.3 0-6 2.7-6 6v12c0 3.3 2.7 6 6 6h28c3.3 0 6-2.7 6-6V-6c0-3.3-2.7-6-6-6H-14zm0 2h2v20h-2c-2.2 0-4-1.8-4-4V-8c0-2.2 1.8-4 4-4zm28 20H0V-10h14c2.2 0 4 1.8 4 4v12c0 2.2-1.8 4-4 4zM-6-2h6v2h-6v-2zm0 4h10v2H-6v-2z" transform="scale(0.9)" />
          </g>
          <g id="icon-agent">
            <path d="M-8-14h16c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-3v4l-4-4H-8c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2zm-2 2v8h2v2.5L2.5 0H8v-12H-10zm7 2h2v2h-2v-2zm-4 0h2v2h-2v-2zm-4 0h2v2H-1v-2z" transform="scale(1.3)" />
          </g>
          <g id="icon-gmail">
            <path d="M-16 6V-8c0-1.1.9-2 2-2h28c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H-14c-1.1 0-2-.9-2-2zm2-14v1.7l14 8.8 14-8.8V-8H-14zm0 16h28V1.2l-14 8.8-14-8.8V4z" />
          </g>
          <g id="icon-jira">
            <path d="M-12-10h24c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2h-10l-6 6v-6H-12c-1.1 0-2-.9-2-2V-8c0-1.1.9-2 2-2zm0 2v16h12v2.5L2.5 8H12V-8H-12zm4 4h16v2H-8v-2zm0 4h12v2H-8V0z" />
          </g>
          <g id="icon-crm">
            <path d="M-4-12c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm14-14h-8v2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-2v2h2c2.2 0 4-1.8 4-4V-6c0-2.2-1.8-4-4-4z" />
          </g>
        </defs>

        <path id="path-1" class="connection-path" d="M160 250 H 250" />
        <path id="path-2" class="connection-path" d="M350 250 C 400 250, 400 130, 450 130" />
        <path id="path-3" class="connection-path" d="M450 130 C 400 130, 400 250, 350 250" />
        <path id="path-4" class="connection-path" d="M350 250 H 700" />
        <path id="path-5" class="connection-path" d="M700 250 C 725 250, 750 150, 775 150" />
        <path id="path-6" class="connection-path" d="M700 250 H 775" />
        <path id="path-7" class="connection-path" d="M700 250 C 725 250, 750 350, 775 350" />

        <g id="email-trigger" class="node-group" transform="translate(50, 220)">
          <rect class="node-rect" width="120" height="60" />
          <use href="#icon-email" class="node-icon" x="25" y="30" />
          <text class="node-label" x="78" y="28">Customer</text>
          <text class="node-sublabel" x="78" y="45">Email</text>
        </g>

        <g id="agent-node" class="node-group" transform="translate(300, 220)">
          <rect class="node-rect" width="100" height="60" />
          <use href="#icon-agent" class="node-icon" x="20" y="30" />
          <text class="node-label" x="65" y="28">AI Agent</text>
          <text class="node-sublabel" x="65" y="45">Triage</text>
        </g>

        <g id="knowledge-node" class="node-group" transform="translate(500, 100)">
          <rect class="node-rect" width="130" height="60" />
          <use href="#icon-knowledge" class="node-icon" x="25" y="30" />
          <text class="node-label" x="80" y="28">Knowledge Base</text>
          <text class="node-sublabel" x="80" y="45">Search</text>
        </g>

        <g id="gmail-node" class="node-group" transform="translate(800, 120)">
          <rect class="node-rect" width="120" height="60" />
          <use href="#icon-gmail" class="node-icon" x="20" y="30" />
          <text class="node-label" x="75" y="28">GMail</text>
          <text class="node-sublabel" x="75" y="45">Draft Reply</text>
        </g>

        <g id="jira-node" class="node-group" transform="translate(800, 220)">
          <rect class="node-rect" width="120" height="60" />
          <use href="#icon-jira" class="node-icon" x="20" y="30" />
          <text class="node-label" x="75" y="28">Jira</text>
          <text class="node-sublabel" x="75" y="45">Escalate Ticket</text>
        </g>

        <g id="crm-node" class="node-group" transform="translate(800, 320)">
          <rect class="node-rect" width="120" height="60" />
          <use href="#icon-crm" class="node-icon" x="20" y="30" />
          <text class="node-label" x="75" y="28">CRM</text>
          <text class="node-sublabel" x="75" y="45">Log Interaction</text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const svgRef = ref(null)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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

  let stopped = false

  const animatePulse = (pathElement, color, duration = 1000) => {
    if (!pathElement) return
    const pulseDot = document.createElementNS(namespace, 'circle')
    pulseDot.setAttribute('r', '5')
    pulseDot.setAttribute('fill', color)
    pulseDot.classList.add('pulse-dot')
    svg.appendChild(pulseDot)

    const animation = pulseDot.animate(
      [
        { offsetDistance: '0%', opacity: 1 },
        { offsetDistance: '100%', opacity: 1 }
      ],
      {
        duration,
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    )

    pulseDot.style.offsetPath = `path('${pathElement.getAttribute('d')}')`

    animation.onfinish = () => {
      if (svg.contains(pulseDot)) {
        svg.removeChild(pulseDot)
      }
    }
  }

  const setActive = (node, active) => {
    if (!node) return
    if (active) {
      node.classList.add('active')
    } else {
      node.classList.remove('active')
    }
  }

  const resetNodes = () => {
    Object.values(nodes).forEach((node) => setActive(node, false))
  }

  const runWorkflow = async () => {
    while (!stopped) {
      resetNodes()
      await sleep(2000)

      setActive(nodes.trigger, true)
      animatePulse(paths.p1, 'var(--email-color)', 800)
      await sleep(800)

      setActive(nodes.trigger, false)
      setActive(nodes.agent, true)
      await sleep(500)

      animatePulse(paths.p2, 'var(--agent-color)', 1000)
      await sleep(1000)
      setActive(nodes.knowledge, true)
      await sleep(1500)

      animatePulse(paths.p3, 'var(--knowledge-color)', 1000)
      setActive(nodes.knowledge, false)
      await sleep(1000)

      await sleep(1000)
      setActive(nodes.agent, false)

      animatePulse(paths.p5, 'var(--agent-color)', 1000)
      animatePulse(paths.p6, 'var(--agent-color)', 1000)
      animatePulse(paths.p7, 'var(--agent-color)', 1000)
      await sleep(1000)

      setActive(nodes.gmail, true)
      setActive(nodes.jira, true)
      setActive(nodes.crm, true)
      await sleep(2500)
    }
  }

  runWorkflow()

  onBeforeUnmount(() => {
    stopped = true
    resetNodes()
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

.workflow-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.animation-container {
  width: 100%;
  max-width: 640px;
  background-image: radial-gradient(var(--dot-color, #4A4A4A) 1px, transparent 0);
  background-size: 20px 20px;
  border: 1px solid var(--node-stroke, #555555);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background-color: var(--bg-color, #1E1E1E);
}

.workflow-svg {
  width: 100%;
  height: auto;
}

.node-group {
  cursor: pointer;
  transition: transform 0.2s ease-out;
}

.node-group:hover {
  transform: scale(1.05);
}

.node-rect {
  fill: var(--node-bg, #2D2D2D);
  stroke: var(--node-stroke, #555555);
  stroke-width: 1.5px;
  rx: 8;
  ry: 8;
  transition: stroke 0.3s ease, fill 0.3s ease;
}

.node-group.active .node-rect {
  stroke-width: 2.5px;
}

.node-icon {
  fill: #FFFFFF;
}

.node-label {
  fill: var(--node-text, #E0E0E0);
  font-size: 14px;
  font-weight: 500;
  text-anchor: middle;
}

.node-sublabel {
  fill: #AAAAAA;
  font-size: 11px;
  text-anchor: middle;
}

#email-trigger.active .node-rect {
  stroke: var(--email-color, #4285F4);
}

#knowledge-node.active .node-rect {
  stroke: var(--knowledge-color, #E1E1E1);
}

#agent-node.active .node-rect {
  stroke: var(--agent-color, #8E44AD);
}

#gmail-node.active .node-rect {
  stroke: var(--gmail-color, #EA4335);
}

#jira-node.active .node-rect {
  stroke: var(--jira-color, #0052CC);
}

#crm-node.active .node-rect {
  stroke: var(--crm-color, #FF5733);
}

.connection-path {
  fill: none;
  stroke: var(--line-color, #666666);
  stroke-width: 2px;
  stroke-linejoin: round;
}

.pulse-dot {
  opacity: 0;
}

@media (max-width: 768px) {
  .animation-container {
    padding: 16px;
  }
}
</style>
