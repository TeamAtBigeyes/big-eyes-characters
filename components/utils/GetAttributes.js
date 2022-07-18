import CryptoES from 'crypto-es';
import { listOfSkills } from '../Skills'
import { listOfAdvantages } from '../Advantages'
import { listOfDisadvantages } from '../Disadvantages'

const HASH_BITS = 16
const HASH_COUNT = 33

const rangeFrom = (array) => {
  return Array.from(array.keys())
}
const range = (count) => {
  return rangeFrom(Array(count))
}

const createHashes = (count, hexDigest) => {
  return range(count).map((index) => {
    let blockSize = parseInt(hexDigest.length / count)
    let currentEnd = (1 + index) * blockSize
    let currentStart = currentEnd - blockSize
    return parseInt(hexDigest.slice(currentStart, currentEnd), HASH_BITS)
  })
}

class Attributes {
  constructor(hash) {
    this.iter = 4
    this.hashcount = HASH_COUNT
    this.maxAttributeLevel = 20
    this.maxNumberOfSkills = parseInt(listOfSkills.length * 2 / 3)
    this.maxNumberOfAdvantages = parseInt(listOfAdvantages.length * 2 / 3)
    this.maxNumberOfDisadvantages = parseInt(listOfDisadvantages.length * 2 / 3)
    const hexDigest = CryptoES.SHA512(hash).toString(CryptoES.enc.Hex)
    this.hasharray = createHashes(this.hashcount, hexDigest)
  }

  getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    // if (n > len)
    //     throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = this.getAttribute(len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  getAttributes = () => {
    // crypto.createHash('sha512').update('my string for hashing').digest('hex');
    const basicAttributes = range(4).map((index) => {
      return this.getAttribute(this.maxAttributeLevel+1)
    })

    const skills = this.getTrait(this.maxNumberOfSkills, listOfSkills)
    const advantages = this.getTrait(this.maxNumberOfAdvantages, listOfAdvantages)
    const disadvantages = this.getTrait(this.maxNumberOfDisadvantages, listOfDisadvantages)
    return { basicAttributes, skills, advantages, disadvantages }
  }
  getAttribute = (numberOfOptions) => {
    return this.hasharray[this.iter++] % numberOfOptions
  }
  getTrait = (maxNumberOfTraits, listOfTraits) => {
    return this.getRandom(
      listOfTraits,
      this.getAttribute(maxNumberOfTraits)
    )
  }
}
const getAttributes = (hash) => {
  const attributes = new Attributes(hash)
  return attributes.getAttributes()
}

export default getAttributes