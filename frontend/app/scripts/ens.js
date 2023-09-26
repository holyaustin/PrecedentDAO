export async function getEnsName() {
  console.log("pressed")
  const provider = new ethers.BrowserProvider(ethereum);
  //var address = await provider.resolveName('alice.eth');
  var address = '0x6fC21092DA55B392b045eD78F4732bff3C580e2c';
  var name = await provider.lookupAddress(address);
  console.log(name)

}