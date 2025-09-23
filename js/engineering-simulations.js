// Engineering Simulations Namespace
window.EngineeringSimulations = {
  bridgeBuilder: { play: function(canvasId) { document.getElementById(canvasId).getContext('2d').clearRect(0,0,600,320); alert('Bridge Builder: Design and test bridges!'); } },
  robotDesigner: { play: function(canvasId) { document.getElementById(canvasId).getContext('2d').clearRect(0,0,600,320); alert('Robot Designer: Assemble and program robots!'); } },
  energyOptimizer: { play: function(canvasId) { document.getElementById(canvasId).getContext('2d').clearRect(0,0,600,320); alert('Energy Optimizer: Optimize power systems!'); } },
  materialTester: { play: function(canvasId) { document.getElementById(canvasId).getContext('2d').clearRect(0,0,600,320); alert('Material Tester: Test materials!'); } }
};
